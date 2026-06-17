/**
 * Netlify reserved function — fires automatically after every verified form submission.
 * Sends a branded confirmation email to the visitor via Resend.
 *
 * Env vars (set in Netlify dashboard):
 *   RESEND_API_KEY        — Resend API key
 *   CONTACT_FROM_EMAIL    — verified sender address (e.g. "Cercle IA <hello@cercle-ia.be>")
 */

const RESEND_API = 'https://api.resend.com/emails';

// ─── French templates ─────────────────────────────────────────────────────────

function templateContact({ prenom, nom, organisation, message }) {
  const name = prenom || 'là';
  const fullName = [prenom, nom].filter(Boolean).join(' ');

  const html = `<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="fr">
<head>
  <title></title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; padding: 0; }
    a[x-apple-data-detectors] { color: inherit !important; text-decoration: inherit !important; }
    #MessageViewBody a { color: inherit; text-decoration: none; }
    p { line-height: inherit; }
    @media (max-width:720px) {
      .row-content { width: 100% !important; }
      .stack .column { width: 100%; display: block; }
    }
  </style>
</head>
<body style="background-color:#adc8db;margin:0;padding:0;-webkit-text-size-adjust:none;text-size-adjust:none;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#adc8db;">
    <tbody><tr><td>

      <!-- Header logo -->
      <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#e8e8e8;">
        <tbody><tr><td>
          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#061817;border-radius:0;width:700px;margin:0 auto;" width="700">
            <tbody><tr><td style="vertical-align:top;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;">
                <tr><td style="padding:20px 0;">
                  <div align="center"><div style="max-width:280px;">
                    <img src="https://cercle-ia.be/images/email/cercle-ia-logo.png" style="display:block;height:auto;border:0;width:100%;" width="280" alt="Cercle IA" height="auto">
                  </div></div>
                </td></tr>
              </table>
            </td></tr></tbody>
          </table>
        </td></tr></tbody>
      </table>

      <!-- Body -->
      <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#e8e8e8;">
        <tbody><tr><td>
          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#ffffff;border-radius:0;padding:30px 0 20px;width:700px;margin:0 auto;" width="700">
            <tbody><tr>
              <td style="padding:5px 35px;vertical-align:top;">
                <table width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;word-break:break-word;">
                  <tr><td>
                    <div style="color:#444a5b;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.5;text-align:left;">
                      <p style="margin:0 0 30px;">Bonjour ${name},</p>
                      <p style="margin:0 0 30px;">Votre message a bien été reçu. Nous vous répondrons dans les <strong>48 heures ouvrables</strong>.</p>
                    </div>

                    <!-- Récapitulatif -->
                    <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;background:#f5f5f5;border-radius:8px;overflow:hidden;margin-bottom:30px;">
                      <tr><td style="padding:16px 20px 12px;border-bottom:1px solid #e0e0e0;">
                        <p style="margin:0;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#888888;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">Récapitulatif</p>
                      </td></tr>
                      ${fullName ? `<tr><td style="padding:10px 20px 2px;font-size:12px;color:#888888;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">Nom</td></tr>
                      <tr><td style="padding:0 20px 10px;font-size:14px;color:#333333;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">${fullName}</td></tr>` : ''}
                      ${organisation ? `<tr><td style="padding:10px 20px 2px;font-size:12px;color:#888888;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">Organisation</td></tr>
                      <tr><td style="padding:0 20px 10px;font-size:14px;color:#333333;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">${organisation}</td></tr>` : ''}
                      ${message ? `<tr><td style="padding:10px 20px 2px;font-size:12px;color:#888888;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">Message</td></tr>
                      <tr><td style="padding:0 20px 14px;font-size:14px;color:#333333;line-height:1.6;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">${message.replace(/\n/g, '<br/>')}</td></tr>` : ''}
                    </table>

                    <div style="color:#444a5b;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.5;text-align:left;">
                      <p style="margin:0 0 30px;">N'hésitez pas à nous contacter si vous avez la moindre question : +32 (2) 808 75 45, hello@lecercle.ai.</p>
                      <p style="margin:0 0 30px;">Bien cordialement,</p>
                      <p style="margin:0;"><strong>L'équipe du Cercle IA</strong></p>
                    </div>
                  </td></tr>
                </table>
              </td>
            </tr></tbody>
          </table>
        </td></tr></tbody>
      </table>

      <!-- Footer -->
      ${emailFooter()}

    </td></tr></tbody>
  </table>
</body>
</html>`;

  const text = `Bonjour ${name},

Votre message a bien été reçu. Nous vous répondrons dans les 48 heures ouvrables.

--- Récapitulatif ---
${fullName ? `Nom : ${fullName}\n` : ''}${organisation ? `Organisation : ${organisation}\n` : ''}${message ? `Message : ${message}\n` : ''}
--------------------

N'hésitez pas à nous contacter : +32 (2) 808 75 45, hello@lecercle.ai.

Bien cordialement,
L'équipe du Cercle IA · cercle-ia.be`;

  return {
    subject: `Votre message a bien été reçu — Cercle IA`,
    html,
    text,
  };
}

// ─────────────────────────────────────────────────────────────────────────────

function templateWaitlist({ prenom }) {
  const name = prenom || 'là';

  const html = `<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="fr">
<head>
  <title></title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; padding: 0; }
    a[x-apple-data-detectors] { color: inherit !important; text-decoration: inherit !important; }
    #MessageViewBody a { color: inherit; text-decoration: none; }
    p { line-height: inherit; }
    @media (max-width:720px) {
      .row-content { width: 100% !important; }
      .stack .column { width: 100%; display: block; }
    }
  </style>
</head>
<body style="background-color:#adc8db;margin:0;padding:0;-webkit-text-size-adjust:none;text-size-adjust:none;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#adc8db;">
    <tbody><tr><td>

      <!-- Header logo -->
      <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#e8e8e8;">
        <tbody><tr><td>
          <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#061817;border-radius:0;color:#000000;width:700px;margin:0 auto;" width="700">
            <tbody><tr>
              <td width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;font-weight:400;text-align:left;vertical-align:top;">
                <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;">
                  <tr><td style="padding:20px 0;width:100%;">
                    <div align="center"><div style="max-width:280px;">
                      <img src="https://cercle-ia.be/images/email/cercle-ia-logo.png" style="display:block;height:auto;border:0;width:100%;" width="280" alt="Cercle IA" height="auto">
                    </div></div>
                  </td></tr>
                </table>
              </td>
            </tr></tbody>
          </table>
        </td></tr></tbody>
      </table>

      <!-- Body -->
      <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#e8e8e8;">
        <tbody><tr><td>
          <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#ffffff;border-radius:0;color:#000000;padding-bottom:20px;padding-top:30px;width:700px;margin:0 auto;" width="700">
            <tbody><tr>
              <td width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;font-weight:400;text-align:left;padding:5px 35px;vertical-align:top;">
                <table width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;word-break:break-word;">
                  <tr><td>
                    <div style="color:#444a5b;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.2;text-align:left;">
                      <p style="margin:0 0 30px;">Bonjour ${name},</p>
                      <p style="margin:0 0 30px;">Merci beaucoup pour votre intérêt pour le <strong>Cercle IA Bootcamp</strong>.</p>
                      <p style="margin:0 0 30px;">Votre inscription sur la liste d'attente est bien enregistrée et nous vous remercions de votre confiance.</p>
                      <p style="margin:0 0 0;">Que se passe-t-il maintenant ?</p>
                      <ul style="margin-bottom:30px;">
                        <li>Nous vous enverrons une notification personnelle par email dès l'ouverture officielle des inscriptions et la publication du calendrier de la nouvelle session.</li>
                        <li>Vous recevrez ainsi les informations avant tout le monde et aurez un accès prioritaire pour réserver votre place.</li>
                      </ul>
                      <p style="margin:0 0 30px;">N'hésitez pas à nous contacter si vous avez la moindre question : +32 (2) 808 75 45, hello@lecercle.ai.</p>
                      <p style="margin:0 0 50px;">Nous avons hâte de démarrer cette aventure avec vous !</p>
                      <p style="margin:0 0 30px;">Bien cordialement,</p>
                      <p style="margin:0;"><strong>L'équipe du Cercle IA</strong></p>
                    </div>
                  </td></tr>
                </table>
              </td>
            </tr></tbody>
          </table>
        </td></tr></tbody>
      </table>

      <!-- Footer -->
      ${emailFooter()}

    </td></tr></tbody>
  </table>
</body>
</html>`;

  const text = `Bonjour ${name},

Merci beaucoup pour votre intérêt pour le Cercle IA Bootcamp.

Votre inscription sur la liste d'attente est bien enregistrée et nous vous remercions de votre confiance.

Que se passe-t-il maintenant ?
- Nous vous enverrons une notification personnelle par email dès l'ouverture officielle des inscriptions et la publication du calendrier de la nouvelle session.
- Vous recevrez ainsi les informations avant tout le monde et aurez un accès prioritaire pour réserver votre place.

N'hésitez pas à nous contacter si vous avez la moindre question : +32 (2) 808 75 45, hello@lecercle.ai.

Nous avons hâte de démarrer cette aventure avec vous !

Bien cordialement,
L'équipe du Cercle IA · cercle-ia.be`;

  return {
    subject: `Votre inscription sur la liste d'attente — Bootcamp Cercle IA`,
    html,
    text,
  };
}

// ─────────────────────────────────────────────────────────────────────────────

function templateFormationSurMesure({ prenom, nom, metier, entreprise, taille, message }) {
  const name = prenom || 'là';
  const fullName = [prenom, nom].filter(Boolean).join(' ');

  const html = `<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="fr">
<head>
  <title></title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; padding: 0; }
    a[x-apple-data-detectors] { color: inherit !important; text-decoration: inherit !important; }
    #MessageViewBody a { color: inherit; text-decoration: none; }
    p { line-height: inherit; }
    @media (max-width:720px) {
      .row-content { width: 100% !important; }
      .stack .column { width: 100%; display: block; }
    }
  </style>
</head>
<body style="background-color:#adc8db;margin:0;padding:0;-webkit-text-size-adjust:none;text-size-adjust:none;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#adc8db;">
    <tbody><tr><td>

      <!-- Header logo -->
      <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#e8e8e8;">
        <tbody><tr><td>
          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#061817;border-radius:0;width:700px;margin:0 auto;" width="700">
            <tbody><tr><td style="vertical-align:top;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;">
                <tr><td style="padding:20px 0;">
                  <div align="center"><div style="max-width:280px;">
                    <img src="https://cercle-ia.be/images/email/cercle-ia-logo.png" style="display:block;height:auto;border:0;width:100%;" width="280" alt="Cercle IA" height="auto">
                  </div></div>
                </td></tr>
              </table>
            </td></tr></tbody>
          </table>
        </td></tr></tbody>
      </table>

      <!-- Body -->
      <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#e8e8e8;">
        <tbody><tr><td>
          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#ffffff;border-radius:0;padding:30px 0 20px;width:700px;margin:0 auto;" width="700">
            <tbody><tr>
              <td style="padding:5px 35px;vertical-align:top;">
                <table width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;word-break:break-word;">
                  <tr><td>
                    <div style="color:#444a5b;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.5;text-align:left;">
                      <p style="margin:0 0 30px;">Bonjour ${name},</p>
                      <p style="margin:0 0 30px;">Votre demande de formation sur mesure a bien été transmise à notre équipe. Nous vous recontacterons dans les <strong>48 à 72 heures ouvrables</strong> pour échanger sur votre projet.</p>
                    </div>

                    <!-- Récapitulatif -->
                    <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;background:#f5f5f5;border-radius:8px;overflow:hidden;margin-bottom:30px;">
                      <tr><td style="padding:16px 20px 12px;border-bottom:1px solid #e0e0e0;">
                        <p style="margin:0;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#888888;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">Récapitulatif</p>
                      </td></tr>
                      ${fullName ? `<tr><td style="padding:10px 20px 2px;font-size:12px;color:#888888;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">Nom</td></tr>
                      <tr><td style="padding:0 20px 10px;font-size:14px;color:#333333;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">${fullName}</td></tr>` : ''}
                      ${metier ? `<tr><td style="padding:10px 20px 2px;font-size:12px;color:#888888;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">Métier</td></tr>
                      <tr><td style="padding:0 20px 10px;font-size:14px;color:#333333;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">${metier}</td></tr>` : ''}
                      ${entreprise ? `<tr><td style="padding:10px 20px 2px;font-size:12px;color:#888888;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">Entreprise</td></tr>
                      <tr><td style="padding:0 20px 10px;font-size:14px;color:#333333;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">${entreprise}</td></tr>` : ''}
                      ${taille ? `<tr><td style="padding:10px 20px 2px;font-size:12px;color:#888888;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">Taille de l'équipe</td></tr>
                      <tr><td style="padding:0 20px 10px;font-size:14px;color:#333333;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">${taille}</td></tr>` : ''}
                      ${message ? `<tr><td style="padding:10px 20px 2px;font-size:12px;color:#888888;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">Message</td></tr>
                      <tr><td style="padding:0 20px 14px;font-size:14px;color:#333333;line-height:1.6;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">${message.replace(/\n/g, '<br/>')}</td></tr>` : ''}
                    </table>

                    <div style="color:#444a5b;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.5;text-align:left;">
                      <p style="margin:0 0 30px;">N'hésitez pas à nous contacter si vous avez la moindre question : +32 (2) 808 75 45, hello@lecercle.ai.</p>
                      <p style="margin:0 0 30px;">Bien cordialement,</p>
                      <p style="margin:0;"><strong>L'équipe du Cercle IA</strong></p>
                    </div>
                  </td></tr>
                </table>
              </td>
            </tr></tbody>
          </table>
        </td></tr></tbody>
      </table>

      <!-- Footer -->
      ${emailFooter()}

    </td></tr></tbody>
  </table>
</body>
</html>`;

  const text = `Bonjour ${name},

Votre demande de formation sur mesure a bien été transmise à notre équipe. Nous vous recontacterons dans les 48 à 72 heures ouvrables.

--- Récapitulatif ---
${fullName ? `Nom : ${fullName}\n` : ''}${metier ? `Métier : ${metier}\n` : ''}${entreprise ? `Entreprise : ${entreprise}\n` : ''}${taille ? `Taille de l'équipe : ${taille}\n` : ''}${message ? `Message : ${message}\n` : ''}
--------------------

N'hésitez pas à nous contacter : +32 (2) 808 75 45, hello@lecercle.ai.

Bien cordialement,
L'équipe du Cercle IA · cercle-ia.be`;

  return {
    subject: `Votre demande de formation sur mesure — Cercle IA`,
    html,
    text,
  };
}

// ─────────────────────────────────────────────────────────────────────────────

function templateProgramme({ prenom, nom, entreprise, fonction }) {
  const name = prenom || 'là';

  const html = `<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="fr">
<head>
  <title></title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; padding: 0; }
    a[x-apple-data-detectors] { color: inherit !important; text-decoration: inherit !important; }
    #MessageViewBody a { color: inherit; text-decoration: none; }
    p { line-height: inherit; }
    @media (max-width:720px) {
      .row-content { width: 100% !important; }
      .stack .column { width: 100%; display: block; }
    }
  </style>
</head>
<body style="background-color:#adc8db;margin:0;padding:0;-webkit-text-size-adjust:none;text-size-adjust:none;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#adc8db;">
    <tbody><tr><td>

      <!-- Header logo -->
      <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#e8e8e8;">
        <tbody><tr><td>
          <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#061817;border-radius:0;color:#000000;width:700px;margin:0 auto;" width="700">
            <tbody><tr>
              <td width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;font-weight:400;text-align:left;vertical-align:top;">
                <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;">
                  <tr><td style="padding:20px 0;width:100%;">
                    <div align="center"><div style="max-width:280px;">
                      <img src="https://cercle-ia.be/images/email/cercle-ia-logo.png" style="display:block;height:auto;border:0;width:100%;" width="280" alt="Cercle IA" height="auto">
                    </div></div>
                  </td></tr>
                </table>
              </td>
            </tr></tbody>
          </table>
        </td></tr></tbody>
      </table>

      <!-- Body intro -->
      <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#e8e8e8;">
        <tbody><tr><td>
          <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#ffffff;border-radius:0;color:#000000;padding-bottom:20px;padding-top:30px;width:700px;margin:0 auto;" width="700">
            <tbody><tr>
              <td width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;font-weight:400;text-align:left;padding:5px 35px;vertical-align:top;">
                <table width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;word-break:break-word;">
                  <tr><td>
                    <div style="color:#444a5b;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.2;text-align:left;">
                      <p style="margin:0 0 30px;">Bonjour ${name},</p>
                      <p style="margin:0 0 30px;">Merci pour votre intérêt pour notre&nbsp;<strong>Bootcamp IA pour professionnels du conseil</strong>&nbsp;!</p>
                      <p style="margin:0 0 30px;">Vous trouverez le programme complet de notre formation ci-dessous.</p>
                      <p style="margin:0;">Si vous souhaitez échanger sur vos objectifs spécifiques, nous vous proposons un appel découverte de 30 minutes.</p>
                    </div>
                  </td></tr>
                </table>
              </td>
            </tr></tbody>
          </table>
        </td></tr></tbody>
      </table>

      <!-- CTAs -->
      <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#e8e8e8;">
        <tbody><tr><td>
          <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#ffffff;border-radius:0;color:#000000;width:700px;margin:0 auto;" width="700">
            <tbody><tr>
              <td width="50%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;font-weight:400;text-align:left;padding:5px 0;vertical-align:top;">
                <table width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;">
                  <tr><td><div align="center">
                    <a href="https://jo.my/bootcamp-ia-programme-4" target="_blank" style="color:#000;text-decoration:none;">
                      <span style="background-color:#f7ab6e;border-radius:30px;color:#000;display:inline-block;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;padding:5px 20px;text-align:center;word-break:keep-all;">
                        <span style="line-height:32px;">&nbsp;Télécharger le programme</span>
                      </span>
                    </a>
                  </div></td></tr>
                </table>
              </td>
              <td width="50%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;font-weight:400;text-align:left;padding:5px 0;vertical-align:top;">
                <table width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;">
                  <tr><td><div align="center">
                    <a href="https://bookme.name/tarikhennen/lite/rdv-le-cercle-ia" target="_blank" style="color:#000;text-decoration:none;">
                      <span style="background-color:#f7ab6e;border-radius:30px;color:#000;display:inline-block;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;padding:5px 20px;text-align:center;word-break:keep-all;">
                        <span style="line-height:32px;">Réserver un appel découverte</span>
                      </span>
                    </a>
                  </div></td></tr>
                </table>
              </td>
            </tr></tbody>
          </table>
        </td></tr></tbody>
      </table>

      <!-- Body closing -->
      <table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#e8e8e8;">
        <tbody><tr><td>
          <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#ffffff;border-radius:0;color:#000000;padding-bottom:25px;padding-top:20px;width:700px;margin:0 auto;" width="700">
            <tbody><tr>
              <td width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;font-weight:400;text-align:left;padding:25px 35px 5px;vertical-align:top;">
                <table width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;word-break:break-word;">
                  <tr><td>
                    <div style="color:#444a5b;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.2;text-align:left;">
                      <p style="margin:0 0 30px;"><strong>Des questions ?</strong>&nbsp;Répondez simplement à cet email, nous lisons et répondons personnellement à chaque message.</p>
                      <p style="margin:0;"><strong>L'équipe du Cercle IA</strong></p>
                    </div>
                  </td></tr>
                </table>
              </td>
            </tr></tbody>
          </table>
        </td></tr></tbody>
      </table>

      <!-- Footer -->
      ${emailFooter()}

    </td></tr></tbody>
  </table>
</body>
</html>`;

  const text = `Bonjour ${name},

Merci pour votre intérêt pour notre Bootcamp IA pour professionnels du conseil !

Vous trouverez le programme complet ici : https://jo.my/bootcamp-ia-programme-4

Pour échanger sur vos objectifs, réservez un appel découverte de 30 minutes :
https://bookme.name/tarikhennen/lite/rdv-le-cercle-ia

Des questions ? Répondez simplement à cet email, nous lisons et répondons personnellement à chaque message.

L'équipe du Cercle IA · cercle-ia.be`;

  return {
    subject: `Votre programme Bootcamp IA — Cercle IA`,
    html,
    text,
  };
}

// ─── English templates ────────────────────────────────────────────────────────

function templateContactEN({ prenom, nom, organisation, message }) {
  const name = prenom || 'there';
  const fullName = [prenom, nom].filter(Boolean).join(' ');

  const html = `<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
<head>
  <title></title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; padding: 0; }
    a[x-apple-data-detectors] { color: inherit !important; text-decoration: inherit !important; }
    #MessageViewBody a { color: inherit; text-decoration: none; }
    p { line-height: inherit; }
    @media (max-width:720px) {
      .row-content { width: 100% !important; }
      .stack .column { width: 100%; display: block; }
    }
  </style>
</head>
<body style="background-color:#adc8db;margin:0;padding:0;-webkit-text-size-adjust:none;text-size-adjust:none;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#adc8db;">
    <tbody><tr><td>

      <!-- Header logo -->
      <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#e8e8e8;">
        <tbody><tr><td>
          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#061817;border-radius:0;width:700px;margin:0 auto;" width="700">
            <tbody><tr><td style="vertical-align:top;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;">
                <tr><td style="padding:20px 0;">
                  <div align="center"><div style="max-width:280px;">
                    <img src="https://cercle-ia.be/images/email/cercle-ia-logo.png" style="display:block;height:auto;border:0;width:100%;" width="280" alt="Cercle IA" height="auto">
                  </div></div>
                </td></tr>
              </table>
            </td></tr></tbody>
          </table>
        </td></tr></tbody>
      </table>

      <!-- Body -->
      <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#e8e8e8;">
        <tbody><tr><td>
          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#ffffff;border-radius:0;padding:30px 0 20px;width:700px;margin:0 auto;" width="700">
            <tbody><tr>
              <td style="padding:5px 35px;vertical-align:top;">
                <table width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;word-break:break-word;">
                  <tr><td>
                    <div style="color:#444a5b;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.5;text-align:left;">
                      <p style="margin:0 0 30px;">Hello ${name},</p>
                      <p style="margin:0 0 30px;">Your message has been received. We will get back to you within <strong>48 business hours</strong>.</p>
                    </div>

                    <!-- Summary -->
                    <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;background:#f5f5f5;border-radius:8px;overflow:hidden;margin-bottom:30px;">
                      <tr><td style="padding:16px 20px 12px;border-bottom:1px solid #e0e0e0;">
                        <p style="margin:0;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#888888;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">Summary</p>
                      </td></tr>
                      ${fullName ? `<tr><td style="padding:10px 20px 2px;font-size:12px;color:#888888;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">Name</td></tr>
                      <tr><td style="padding:0 20px 10px;font-size:14px;color:#333333;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">${fullName}</td></tr>` : ''}
                      ${organisation ? `<tr><td style="padding:10px 20px 2px;font-size:12px;color:#888888;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">Organisation</td></tr>
                      <tr><td style="padding:0 20px 10px;font-size:14px;color:#333333;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">${organisation}</td></tr>` : ''}
                      ${message ? `<tr><td style="padding:10px 20px 2px;font-size:12px;color:#888888;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">Message</td></tr>
                      <tr><td style="padding:0 20px 14px;font-size:14px;color:#333333;line-height:1.6;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">${message.replace(/\n/g, '<br/>')}</td></tr>` : ''}
                    </table>

                    <div style="color:#444a5b;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.5;text-align:left;">
                      <p style="margin:0 0 30px;">Feel free to reach out if you have any questions: +32 (2) 808 75 45, hello@lecercle.ai.</p>
                      <p style="margin:0 0 30px;">Kind regards,</p>
                      <p style="margin:0;"><strong>The Cercle IA team</strong></p>
                    </div>
                  </td></tr>
                </table>
              </td>
            </tr></tbody>
          </table>
        </td></tr></tbody>
      </table>

      <!-- Footer -->
      ${emailFooter()}

    </td></tr></tbody>
  </table>
</body>
</html>`;

  const text = `Hello ${name},

Your message has been received. We will get back to you within 48 business hours.

--- Summary ---
${fullName ? `Name: ${fullName}\n` : ''}${organisation ? `Organisation: ${organisation}\n` : ''}${message ? `Message: ${message}\n` : ''}
---------------

Feel free to reach out: +32 (2) 808 75 45, hello@lecercle.ai.

Kind regards,
The Cercle IA team · cercle-ia.be`;

  return {
    subject: `Your message has been received — Cercle IA`,
    html,
    text,
  };
}

// ─────────────────────────────────────────────────────────────────────────────

function templateWaitlistEN({ prenom }) {
  const name = prenom || 'there';

  const html = `<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
<head>
  <title></title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; padding: 0; }
    a[x-apple-data-detectors] { color: inherit !important; text-decoration: inherit !important; }
    #MessageViewBody a { color: inherit; text-decoration: none; }
    p { line-height: inherit; }
    @media (max-width:720px) {
      .row-content { width: 100% !important; }
      .stack .column { width: 100%; display: block; }
    }
  </style>
</head>
<body style="background-color:#adc8db;margin:0;padding:0;-webkit-text-size-adjust:none;text-size-adjust:none;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#adc8db;">
    <tbody><tr><td>

      <!-- Header logo -->
      <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#e8e8e8;">
        <tbody><tr><td>
          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#061817;border-radius:0;width:700px;margin:0 auto;" width="700">
            <tbody><tr><td style="vertical-align:top;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;">
                <tr><td style="padding:20px 0;">
                  <div align="center"><div style="max-width:280px;">
                    <img src="https://cercle-ia.be/images/email/cercle-ia-logo.png" style="display:block;height:auto;border:0;width:100%;" width="280" alt="Cercle IA" height="auto">
                  </div></div>
                </td></tr>
              </table>
            </td></tr></tbody>
          </table>
        </td></tr></tbody>
      </table>

      <!-- Body -->
      <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#e8e8e8;">
        <tbody><tr><td>
          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#ffffff;border-radius:0;padding:30px 0 20px;width:700px;margin:0 auto;" width="700">
            <tbody><tr>
              <td style="padding:5px 35px;vertical-align:top;">
                <table width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;word-break:break-word;">
                  <tr><td>
                    <div style="color:#444a5b;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.2;text-align:left;">
                      <p style="margin:0 0 30px;">Hello ${name},</p>
                      <p style="margin:0 0 30px;">Thank you for your interest in the <strong>Cercle IA Bootcamp</strong>.</p>
                      <p style="margin:0 0 30px;">You are now on the waitlist and we truly appreciate your trust.</p>
                      <p style="margin:0 0 0;">What happens next?</p>
                      <ul style="margin-bottom:30px;">
                        <li>We will send you a personal email notification as soon as registrations officially open and the new session dates are published.</li>
                        <li>You will receive this information before anyone else and will have priority access to reserve your spot.</li>
                      </ul>
                      <p style="margin:0 0 30px;">Feel free to reach out if you have any questions: +32 (2) 808 75 45, hello@lecercle.ai.</p>
                      <p style="margin:0 0 50px;">We look forward to starting this journey with you!</p>
                      <p style="margin:0 0 30px;">Kind regards,</p>
                      <p style="margin:0;"><strong>The Cercle IA team</strong></p>
                    </div>
                  </td></tr>
                </table>
              </td>
            </tr></tbody>
          </table>
        </td></tr></tbody>
      </table>

      <!-- Footer -->
      ${emailFooter()}

    </td></tr></tbody>
  </table>
</body>
</html>`;

  const text = `Hello ${name},

Thank you for your interest in the Cercle IA Bootcamp.

You are now on the waitlist and we truly appreciate your trust.

What happens next?
- We will send you a personal email notification as soon as registrations officially open and the new session dates are published.
- You will receive this information before anyone else and will have priority access to reserve your spot.

Feel free to reach out if you have any questions: +32 (2) 808 75 45, hello@lecercle.ai.

We look forward to starting this journey with you!

Kind regards,
The Cercle IA team · cercle-ia.be`;

  return {
    subject: `You're on the waitlist — Cercle IA Bootcamp`,
    html,
    text,
  };
}

// ─────────────────────────────────────────────────────────────────────────────

function templateFormationSurMesureEN({ prenom, nom, metier, entreprise, taille, message }) {
  const name = prenom || 'there';
  const fullName = [prenom, nom].filter(Boolean).join(' ');

  const html = `<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
<head>
  <title></title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; padding: 0; }
    a[x-apple-data-detectors] { color: inherit !important; text-decoration: inherit !important; }
    #MessageViewBody a { color: inherit; text-decoration: none; }
    p { line-height: inherit; }
    @media (max-width:720px) {
      .row-content { width: 100% !important; }
      .stack .column { width: 100%; display: block; }
    }
  </style>
</head>
<body style="background-color:#adc8db;margin:0;padding:0;-webkit-text-size-adjust:none;text-size-adjust:none;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#adc8db;">
    <tbody><tr><td>

      <!-- Header logo -->
      <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#e8e8e8;">
        <tbody><tr><td>
          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#061817;border-radius:0;width:700px;margin:0 auto;" width="700">
            <tbody><tr><td style="vertical-align:top;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;">
                <tr><td style="padding:20px 0;">
                  <div align="center"><div style="max-width:280px;">
                    <img src="https://cercle-ia.be/images/email/cercle-ia-logo.png" style="display:block;height:auto;border:0;width:100%;" width="280" alt="Cercle IA" height="auto">
                  </div></div>
                </td></tr>
              </table>
            </td></tr></tbody>
          </table>
        </td></tr></tbody>
      </table>

      <!-- Body -->
      <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#e8e8e8;">
        <tbody><tr><td>
          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#ffffff;border-radius:0;padding:30px 0 20px;width:700px;margin:0 auto;" width="700">
            <tbody><tr>
              <td style="padding:5px 35px;vertical-align:top;">
                <table width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;word-break:break-word;">
                  <tr><td>
                    <div style="color:#444a5b;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.5;text-align:left;">
                      <p style="margin:0 0 30px;">Hello ${name},</p>
                      <p style="margin:0 0 30px;">Your custom training request has been sent to our team. We will get back to you within <strong>48 to 72 business hours</strong> to discuss your project.</p>
                    </div>

                    <!-- Summary -->
                    <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;background:#f5f5f5;border-radius:8px;overflow:hidden;margin-bottom:30px;">
                      <tr><td style="padding:16px 20px 12px;border-bottom:1px solid #e0e0e0;">
                        <p style="margin:0;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#888888;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">Summary</p>
                      </td></tr>
                      ${fullName ? `<tr><td style="padding:10px 20px 2px;font-size:12px;color:#888888;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">Name</td></tr>
                      <tr><td style="padding:0 20px 10px;font-size:14px;color:#333333;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">${fullName}</td></tr>` : ''}
                      ${metier ? `<tr><td style="padding:10px 20px 2px;font-size:12px;color:#888888;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">Job title</td></tr>
                      <tr><td style="padding:0 20px 10px;font-size:14px;color:#333333;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">${metier}</td></tr>` : ''}
                      ${entreprise ? `<tr><td style="padding:10px 20px 2px;font-size:12px;color:#888888;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">Company</td></tr>
                      <tr><td style="padding:0 20px 10px;font-size:14px;color:#333333;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">${entreprise}</td></tr>` : ''}
                      ${taille ? `<tr><td style="padding:10px 20px 2px;font-size:12px;color:#888888;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">Team size</td></tr>
                      <tr><td style="padding:0 20px 10px;font-size:14px;color:#333333;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">${taille}</td></tr>` : ''}
                      ${message ? `<tr><td style="padding:10px 20px 2px;font-size:12px;color:#888888;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">Message</td></tr>
                      <tr><td style="padding:0 20px 14px;font-size:14px;color:#333333;line-height:1.6;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">${message.replace(/\n/g, '<br/>')}</td></tr>` : ''}
                    </table>

                    <div style="color:#444a5b;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.5;text-align:left;">
                      <p style="margin:0 0 30px;">Feel free to reach out if you have any questions: +32 (2) 808 75 45, hello@lecercle.ai.</p>
                      <p style="margin:0 0 30px;">Kind regards,</p>
                      <p style="margin:0;"><strong>The Cercle IA team</strong></p>
                    </div>
                  </td></tr>
                </table>
              </td>
            </tr></tbody>
          </table>
        </td></tr></tbody>
      </table>

      <!-- Footer -->
      ${emailFooter()}

    </td></tr></tbody>
  </table>
</body>
</html>`;

  const text = `Hello ${name},

Your custom training request has been sent to our team. We will get back to you within 48 to 72 business hours to discuss your project.

--- Summary ---
${fullName ? `Name: ${fullName}\n` : ''}${metier ? `Job title: ${metier}\n` : ''}${entreprise ? `Company: ${entreprise}\n` : ''}${taille ? `Team size: ${taille}\n` : ''}${message ? `Message: ${message}\n` : ''}
---------------

Feel free to reach out: +32 (2) 808 75 45, hello@lecercle.ai.

Kind regards,
The Cercle IA team · cercle-ia.be`;

  return {
    subject: `Your custom training request — Cercle IA`,
    html,
    text,
  };
}

// ─────────────────────────────────────────────────────────────────────────────

function templateProgrammeEN({ prenom, nom, entreprise, fonction }) {
  const name = prenom || 'there';

  const html = `<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
<head>
  <title></title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; padding: 0; }
    a[x-apple-data-detectors] { color: inherit !important; text-decoration: inherit !important; }
    #MessageViewBody a { color: inherit; text-decoration: none; }
    p { line-height: inherit; }
    @media (max-width:720px) {
      .row-content { width: 100% !important; }
      .stack .column { width: 100%; display: block; }
    }
  </style>
</head>
<body style="background-color:#adc8db;margin:0;padding:0;-webkit-text-size-adjust:none;text-size-adjust:none;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#adc8db;">
    <tbody><tr><td>

      <!-- Header logo -->
      <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#e8e8e8;">
        <tbody><tr><td>
          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#061817;border-radius:0;width:700px;margin:0 auto;" width="700">
            <tbody><tr><td style="vertical-align:top;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;">
                <tr><td style="padding:20px 0;">
                  <div align="center"><div style="max-width:280px;">
                    <img src="https://cercle-ia.be/images/email/cercle-ia-logo.png" style="display:block;height:auto;border:0;width:100%;" width="280" alt="Cercle IA" height="auto">
                  </div></div>
                </td></tr>
              </table>
            </td></tr></tbody>
          </table>
        </td></tr></tbody>
      </table>

      <!-- Body intro -->
      <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#e8e8e8;">
        <tbody><tr><td>
          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#ffffff;border-radius:0;padding:30px 0 20px;width:700px;margin:0 auto;" width="700">
            <tbody><tr>
              <td style="padding:5px 35px;vertical-align:top;">
                <table width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;word-break:break-word;">
                  <tr><td>
                    <div style="color:#444a5b;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.2;text-align:left;">
                      <p style="margin:0 0 30px;">Hello ${name},</p>
                      <p style="margin:0 0 30px;">Thank you for your interest in our&nbsp;<strong>AI Bootcamp for consulting professionals</strong>!</p>
                      <p style="margin:0 0 30px;">You will find the full programme below.</p>
                      <p style="margin:0;">If you would like to discuss your specific goals, we offer a 30-minute discovery call.</p>
                    </div>
                  </td></tr>
                </table>
              </td>
            </tr></tbody>
          </table>
        </td></tr></tbody>
      </table>

      <!-- CTAs -->
      <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#e8e8e8;">
        <tbody><tr><td>
          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#ffffff;border-radius:0;width:700px;margin:0 auto;" width="700">
            <tbody><tr>
              <td width="50%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;font-weight:400;text-align:left;padding:5px 0;vertical-align:top;">
                <table width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;">
                  <tr><td><div align="center">
                    <a href="https://jo.my/bootcamp-ia-programme-4" target="_blank" style="color:#000;text-decoration:none;">
                      <span style="background-color:#f7ab6e;border-radius:30px;color:#000;display:inline-block;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;padding:5px 20px;text-align:center;word-break:keep-all;">
                        <span style="line-height:32px;">&nbsp;Download the programme</span>
                      </span>
                    </a>
                  </div></td></tr>
                </table>
              </td>
              <td width="50%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;font-weight:400;text-align:left;padding:5px 0;vertical-align:top;">
                <table width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;">
                  <tr><td><div align="center">
                    <a href="https://bookme.name/tarikhennen/lite/rdv-le-cercle-ia" target="_blank" style="color:#000;text-decoration:none;">
                      <span style="background-color:#f7ab6e;border-radius:30px;color:#000;display:inline-block;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;padding:5px 20px;text-align:center;word-break:keep-all;">
                        <span style="line-height:32px;">Book a discovery call</span>
                      </span>
                    </a>
                  </div></td></tr>
                </table>
              </td>
            </tr></tbody>
          </table>
        </td></tr></tbody>
      </table>

      <!-- Body closing -->
      <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#e8e8e8;">
        <tbody><tr><td>
          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#ffffff;border-radius:0;padding-bottom:25px;padding-top:20px;width:700px;margin:0 auto;" width="700">
            <tbody><tr>
              <td width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;font-weight:400;text-align:left;padding:25px 35px 5px;vertical-align:top;">
                <table width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;word-break:break-word;">
                  <tr><td>
                    <div style="color:#444a5b;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.2;text-align:left;">
                      <p style="margin:0 0 30px;"><strong>Any questions?</strong>&nbsp;Simply reply to this email — we read and personally respond to every message.</p>
                      <p style="margin:0;"><strong>The Cercle IA team</strong></p>
                    </div>
                  </td></tr>
                </table>
              </td>
            </tr></tbody>
          </table>
        </td></tr></tbody>
      </table>

      <!-- Footer -->
      ${emailFooter()}

    </td></tr></tbody>
  </table>
</body>
</html>`;

  const text = `Hello ${name},

Thank you for your interest in our AI Bootcamp for consulting professionals!

Download the full programme: https://jo.my/bootcamp-ia-programme-4

To discuss your goals, book a 30-minute discovery call:
https://bookme.name/tarikhennen/lite/rdv-le-cercle-ia

Any questions? Simply reply to this email — we read and personally respond to every message.

The Cercle IA team · cercle-ia.be`;

  return {
    subject: `Your AI Bootcamp programme — Cercle IA`,
    html,
    text,
  };
}

// ─── Shared footer HTML ───────────────────────────────────────────────────────

function emailFooter() {
  return `<table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#e8e8e8;">
  <tbody><tr><td>
    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#061817;border-radius:0;padding:20px 35px;width:700px;margin:0 auto;" width="700">
      <tbody><tr><td style="vertical-align:top;">
        <table width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;">
          <tr><td><div align="left"><div style="max-width:70px;">
            <img src="https://cercle-ia.be/images/email/cercle-ia-favicon.png" style="display:block;height:auto;border:0;width:100%;" width="70" alt="Cercle IA" height="auto">
          </div></div></td></tr>
        </table>
        <table width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;word-break:break-word;">
          <tr><td>
            <div style="color:#ffffff;font-family:'Open Sans','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;line-height:1.2;text-align:left;">
              <p style="margin:0;">©2026. Le Cercle IA</p>
            </div>
          </td></tr>
        </table>
        <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;">
          <tr><td style="padding:0 10px;text-align:left;"><div align="left">
            <table width="144px" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;display:inline-block;">
              <tr>
                <td style="padding:0 4px 0 0;"><a href="https://www.linkedin.com/company/cercle-ia/" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-white/linkedin@2x.png" width="32" height="auto" alt="LinkedIn" style="display:block;height:auto;border:0;"></a></td>
                <td style="padding:0 4px 0 0;"><a href="https://www.facebook.com/cercleIA" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-white/facebook@2x.png" width="32" height="auto" alt="Facebook" style="display:block;height:auto;border:0;"></a></td>
                <td style="padding:0 4px 0 0;"><a href="https://www.instagram.com/cercle.ia" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-white/instagram@2x.png" width="32" height="auto" alt="Instagram" style="display:block;height:auto;border:0;"></a></td>
                <td style="padding:0 4px 0 0;"><a href="https://cercle-ia.be/" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-white/website@2x.png" width="32" height="auto" alt="Site web" style="display:block;height:auto;border:0;"></a></td>
              </tr>
            </table>
          </div></td></tr>
        </table>
      </td></tr></tbody>
    </table>
  </td></tr></tbody>
</table>`;
}

// ─── Router ──────────────────────────────────────────────────────────────────

function getEmailTemplate(formName, data) {
  const isEN = data?.lang === 'en';

  switch (formName) {
    case 'contact':
      return isEN ? templateContactEN(data) : templateContact(data);
    case 'waitlist':
      return isEN ? templateWaitlistEN(data) : templateWaitlist(data);
    case 'formation-sur-mesure':
      return isEN ? templateFormationSurMesureEN(data) : templateFormationSurMesure(data);
    case 'programme':
      return isEN ? templateProgrammeEN(data) : templateProgramme(data);
    default:
      return null;
  }
}

// ─── Handler ─────────────────────────────────────────────────────────────────

export async function handler(event) {
  try {
    const body = JSON.parse(event.body ?? '{}');
    const formName = body?.payload?.form_name ?? '';
    const data = body?.payload?.data ?? {};
    const email = data?.email?.trim() ?? '';

    // Validate email — basic RFC check
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { statusCode: 200, body: 'No valid email, skipping.' };
    }

    const template = getEmailTemplate(formName, data);
    if (!template) {
      return { statusCode: 200, body: `No template for form "${formName}", skipping.` };
    }

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.CONTACT_FROM_EMAIL;

    if (!apiKey || !from) {
      console.error('Missing RESEND_API_KEY or CONTACT_FROM_EMAIL env vars.');
      return { statusCode: 200, body: 'Env vars missing, skipping.' };
    }

    const res = await fetch(RESEND_API, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [email],
        subject: template.subject,
        html: template.html,
        text: template.text,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error(`Resend error ${res.status}:`, err);
    }
  } catch (err) {
    console.error('submission-created error:', err);
  }

  // Always return 200 — never block Netlify's own processing
  return { statusCode: 200, body: 'OK' };
}
