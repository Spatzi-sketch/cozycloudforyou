export type EmailTemplateVars = {
  confirmUrl: string;
  email: string;
  productName: string;
  restockUrl?: string;
  unsubscribeUrl?: string;
};

export function confirmationEmailHtml({
  confirmUrl,
  email,
  productName,
}: EmailTemplateVars): string {
  return `<!DOCTYPE html>
<html>
  <body style="font-family: 'Nunito', system-ui, sans-serif; background: #fffdf8; color: #55434a; padding: 24px;">
    <div style="max-width: 600px; margin: 0 auto; background: #fff5f8; border-radius: 32px; padding: 40px; text-align: center; border: 2px solid #f7c9d8;">
      <div style="font-size: 40px; margin-bottom: 16px;">&#9730;</div>
      <h1 style="font-family: 'Fredoka', system-ui, sans-serif; color: #55434a; margin: 0 0 12px; font-size: 28px;">
        One more step to get cozy! &#9730;
      </h1>
      <p style="font-size: 16px; line-height: 1.6; color: #55434a; margin: 0 0 24px;">
        Bitte best&auml;tige deine E-Mail-Adresse (&lt;strong&gt;${email}&lt;/strong&gt;), damit wir dich
        beim n&auml;chsten Restock deiner ausgew&auml;hlten Hose („${productName}“) benachrichtigen k&ouml;nnen.
      </p>
      <a href="${confirmUrl}" style="display: inline-block; background: #55434a; color: #ffffff; text-decoration: none; border-radius: 24px; padding: 14px 32px; font-weight: 700; font-family: 'Fredoka', system-ui, sans-serif;">
        CONFIRM MY EMAIL
      </a>
      <p style="font-size: 13px; color: #55434a80; margin-top: 24px;">
        Falls du dich nicht angemeldet hast, kannst du diese E-Mail ignorieren.
      </p>
    </div>
  </body>
</html>`;
}

export function confirmationEmailText({
  confirmUrl,
  email,
  productName,
}: EmailTemplateVars): string {
  return `One more step to get cozy! ☁️

Bitte bestätige deine E-Mail-Adresse (${email}), damit wir dich beim nächsten Restock deiner ausgewählten Hose („${productName}“) benachrichtigen können.

Bestätigungslink: ${confirmUrl}

Falls du dich nicht angemeldet hast, kannst du diese E-Mail ignorieren.`;
}

export function restockEmailHtml({
  restockUrl,
  productName,
  unsubscribeUrl,
}: EmailTemplateVars): string {
  return `<!DOCTYPE html>
<html>
  <body style="font-family: 'Nunito', system-ui, sans-serif; background: #fffdf8; color: #55434a; padding: 24px;">
    <div style="max-width: 600px; margin: 0 auto; background: #fff5f8; border-radius: 32px; padding: 40px; text-align: center; border: 2px solid #f7c9d8;">
      <div style="font-size: 40px; margin-bottom: 16px;">&#9730;</div>
      <h1 style="font-family: 'Fredoka', system-ui, sans-serif; color: #55434a; margin: 0 0 12px; font-size: 28px;">
        Your favorite pants are back! &#9730;
      </h1>
      <p style="font-size: 16px; line-height: 1.6; color: #55434a; margin: 0 0 24px;">
        GOOD NEWS!<br><br>
        Deine Lieblingshose von Cozy Cloud ist wieder verfügbar!<br>
        Du hast dich f&uuml;r dieses Modell eingetragen und wir wollten dich nat&uuml;rlich benachrichtigen.<br><br>
        &lt;strong&gt;Jetzt ansehen und deinen Favoriten entdecken.&lt;/strong&gt;
      </p>
      <a href="${restockUrl}" style="display: inline-block; background: #55434a; color: #ffffff; text-decoration: none; border-radius: 24px; padding: 14px 32px; font-weight: 700; font-family: 'Fredoka', system-ui, sans-serif;">
        ZUR PRODUKTSEITE
      </a>
      <p style="font-size: 13px; color: #55434a80; margin-top: 24px;">
        Keine weiteren Benachrichtigungen mehr erhalten? &lt;a href="${unsubscribeUrl}" style="color: #f4afc6; text-decoration: underline;"&gt;Hier abmelden.&lt;/a&gt;
      </p>
    </div>
  </body>
</html>`;
}

export function restockEmailText({
  restockUrl,
  productName,
  unsubscribeUrl,
}: EmailTemplateVars): string {
  return `Your favorite pants are back! ☁️

GOOD NEWS!

Deine Lieblingshose von Cozy Cloud ist wieder verfügbar!
Du hast dich für dieses Modell eingetragen und wir wollten dich natürlich benachrichtigen.

Jetzt ansehen und deinen Favoriten entdecken:
${restockUrl}

Keine weiteren Benachrichtigungen mehr erhalten? ${unsubscribeUrl}`;
}
