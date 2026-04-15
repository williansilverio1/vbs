/**
 * VBS — Enquiries → Google Sheet
 *
 * SETUP (uma vez):
 * 1. Cria uma nova Google Sheet (ou abre uma existente).
 * 2. Extensões → Apps Script → cola este ficheiro (substitui o conteúdo de Code.gs).
 * 3. Guarda o projeto (Ctrl/Cmd+S).
 * 4. Implementar → Nova implementação → tipo: Aplicação Web
 *    - Executar como: Eu
 *    - Quem tem acesso: Qualquer pessoa
 * 5. Copia o URL da Web App e cola em index.html → GOOGLE_SHEET_WEBAPP_URL
 *
 * Email: após gravar na Sheet, o script envia um alerta com MailApp (autoriza envio
 * de email na primeira vez). Ajusta NOTIFY_EMAIL abaixo se quiseres outro destino.
 *
 * A primeira submissão cria a folha "Enquiries" e o cabeçalho se ainda não existir.
 *
 * ONDE VER OS DADOS: não aparecem no "Sheet1". Abre o separador **Enquiries** (em
 * baixo; se não vires, arrasta as tabs ou menu "≡" ao lado do nome da folha).
 *
 * Se o container abrir vazio no Sheet1 mas houver sucesso no site: corre
 * logContainerSpreadsheetId no editor, cola o ID em SPREADSHEET_ID, redeploy.
 *
 * NOTA: Não uses Run/Debug em doPost — e fica undefined. Usa testDoPostFromEditor
 * ou testa com o formulário no site (POST real).
 */

/**
 * ID da spreadsheet (trecho do URL: /d/ESTE_ID/edit). Força gravação neste ficheiro
 * nos pedidos Web App. Deixa '' para usar só o container (getActiveSpreadsheet).
 */
var SPREADSHEET_ID = '1BpJJq-8kWel47wCOngdwjsdHeS22Je5zGeE_Fz1a-Xw';

/** Muda quando publicas — vê no JSON do site / consola se a Web App está atualizada. */
var SCRIPT_VERSION = 'v2-openById-2026-04-15';

/** Para onde enviar o alerta de nova enquiry. Deixa '' para usar Session.getEffectiveUser().getEmail(). */
var NOTIFY_EMAIL = 'valadaresbuilderssolutions@gmail.com';

var LIMITS = {
  firstName: 100,
  lastName: 100,
  email: 254,
  phone: 40,
  service: 120,
  budget: 80,
  details: 8000
};

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Spreadsheet de destino. Com SPREADSHEET_ID preenchido usa openById (fiável em Web App).
 */
function parseSpreadsheetId(raw) {
  var s = String(raw == null ? '' : raw).trim();
  if (!s) {
    return '';
  }
  var m = s.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (m) {
    return m[1];
  }
  if (/^[a-zA-Z0-9-_]+$/.test(s) && s.length >= 20) {
    return s;
  }
  return '';
}

function getTargetSpreadsheet() {
  var id = parseSpreadsheetId(SPREADSHEET_ID);
  if (id) {
    return SpreadsheetApp.openById(id);
  }
  return SpreadsheetApp.getActiveSpreadsheet();
}

/**
 * Run no editor (dropdown → Run): vê o ID no Registo / Execuções. Copia para SPREADSHEET_ID.
 */
function logContainerSpreadsheetId() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    Logger.log('getActiveSpreadsheet() = null — cola o ID manualmente do URL da Sheet.');
    return;
  }
  Logger.log('SPREADSHEET_ID (copiar para Code.gs): ' + ss.getId());
  Logger.log('URL: https://docs.google.com/spreadsheets/d/' + ss.getId() + '/edit');
}

function clip(str, maxLen) {
  var s = String(str == null ? '' : str).trim();
  if (s.length > maxLen) {
    s = s.substring(0, maxLen);
  }
  return s;
}

function isValidEmail(email) {
  if (!email || email.length > 254) {
    return false;
  }
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Valida e normaliza o payload do formulário. Devolve { row: [...] } ou { error: '...' }.
 */
function normalizeEnquiry(data) {
  var firstName = clip(data.firstName, LIMITS.firstName);
  var lastName = clip(data.lastName, LIMITS.lastName);
  var email = clip(data.email, LIMITS.email).toLowerCase();
  var phone = clip(data.phone, LIMITS.phone);
  var service = clip(data.service, LIMITS.service);
  var budget = clip(data.budget, LIMITS.budget);
  var details = clip(data.details, LIMITS.details);
  var consent =
    data.privacyConsent === 'yes' ||
    data.privacyConsent === true ||
    data.privacyConsent === 'true';

  if (!firstName) {
    return { error: 'First name is required' };
  }
  if (!lastName) {
    return { error: 'Last name is required' };
  }
  if (!isValidEmail(email)) {
    return { error: 'A valid email is required' };
  }
  if (!service) {
    return { error: 'Service is required' };
  }
  if (!details) {
    return { error: 'Project details are required' };
  }
  if (!consent) {
    return { error: 'Privacy consent is required' };
  }

  var submittedAt = clip(data.submittedAt, 40);
  if (!submittedAt) {
    submittedAt = new Date().toISOString();
  }

  return {
    row: [
      submittedAt,
      firstName,
      lastName,
      email,
      phone,
      service,
      budget,
      details,
      'yes'
    ]
  };
}

/**
 * Notificação por email (não bloqueia o formulário se falhar — só regista no log).
 * row: [ submittedAt, firstName, lastName, email, phone, service, budget, details, consent ]
 */
function sendEnquiryEmailNotification(row, lastRow, spreadsheetId) {
  try {
    var to = (NOTIFY_EMAIL && NOTIFY_EMAIL.indexOf('@') > -1)
      ? NOTIFY_EMAIL.trim()
      : Session.getEffectiveUser().getEmail();
    if (!to) {
      Logger.log('sendEnquiryEmailNotification: sem destinatário');
      return;
    }
    var subject = '[VBS] New enquiry — ' + row[1] + ' ' + row[2];
    var sheetUrl = 'https://docs.google.com/spreadsheets/d/' + spreadsheetId + '/edit';
    var body =
      'Nova enquiry gravada na Sheet (linha ' + lastRow + ').\n\n' +
      'Folha: ' + sheetUrl + '\n\n' +
      '---\n' +
      'Submitted: ' + row[0] + '\n' +
      'Name: ' + row[1] + ' ' + row[2] + '\n' +
      'Email: ' + row[3] + '\n' +
      'Phone: ' + (row[4] || '—') + '\n' +
      'Service: ' + row[5] + '\n' +
      'Budget: ' + (row[6] || '—') + '\n' +
      '\nProject details:\n' + row[7] + '\n';
    MailApp.sendEmail({ to: to, subject: subject, body: body });
  } catch (mailErr) {
    Logger.log('sendEnquiryEmailNotification: ' + mailErr);
  }
}

function ensureHeaderRow(sheet) {
  if (sheet.getLastRow() >= 1) {
    return;
  }
  sheet.appendRow([
    'Submitted (UTC)',
    'First Name',
    'Last Name',
    'Email',
    'Phone',
    'Service',
    'Budget',
    'Project Details',
    'Privacy consent'
  ]);
}

/**
 * Simula um POST para testar a escrita na Sheet a partir do editor.
 * Dropdown de funções → testDoPostFromEditor → Run. Ver Executions / Registos.
 */
function testDoPostFromEditor() {
  var mockEvent = {
    postData: {
      contents: JSON.stringify({
        firstName: 'Test',
        lastName: 'Editor',
        email: 'editor-test@example.com',
        phone: '+44 000',
        service: 'General Enquiry',
        budget: 'Prefer not to say',
        details: 'Linha de teste (testDoPostFromEditor)',
        privacyConsent: 'yes',
        submittedAt: new Date().toISOString()
      })
    }
  };
  var out = doPost(mockEvent);
  Logger.log(out.getContent());
}

/** GET no browser — confirma que a Web App está viva. O formulário usa POST → doPost. */
function doGet() {
  return jsonResponse({
    ok: true,
    message: 'VBS enquiries endpoint. Submissions use POST (website form).',
    version: SCRIPT_VERSION,
    spreadsheetTarget: parseSpreadsheetId(SPREADSHEET_ID) ? 'openById' : 'getActiveSpreadsheet'
  });
}

function doPost(e) {
  try {
    if (!e || !e.postData) {
      return jsonResponse({
        ok: false,
        error: 'No POST body. Deploy as Web App and POST JSON, or run testDoPostFromEditor() from the editor.'
      });
    }

    var raw = e.postData.contents || '{}';
    var data;
    try {
      data = JSON.parse(raw);
    } catch (parseErr) {
      return jsonResponse({ ok: false, error: 'Invalid JSON body' });
    }

    var normalized = normalizeEnquiry(data);
    if (normalized.error) {
      return jsonResponse({ ok: false, error: normalized.error });
    }

    var ss = getTargetSpreadsheet();
    if (!ss) {
      return jsonResponse({
        ok: false,
        error: 'Cannot open spreadsheet. Set SPREADSHEET_ID in Code.gs (ID from Sheet URL /d/.../edit).'
      });
    }
    var sheet = ss.getSheetByName('Enquiries');
    if (!sheet) {
      sheet = ss.insertSheet('Enquiries');
    }

    ensureHeaderRow(sheet);
    sheet.appendRow(normalized.row);
    var lastRow = sheet.getLastRow();

    sendEnquiryEmailNotification(normalized.row, lastRow, ss.getId());

    return jsonResponse({
      ok: true,
      version: SCRIPT_VERSION,
      row: lastRow,
      sheetName: sheet.getName(),
      spreadsheetId: ss.getId()
    });
  } catch (err) {
    return jsonResponse({
      ok: false,
      error: String(err.message || err)
    });
  }
}
