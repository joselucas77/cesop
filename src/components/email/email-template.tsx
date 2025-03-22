import {
  Body,
  Button,
  Container,
  Head,
  Html,
  // Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface EmailTemplateProps {
  username?: string;
  yourPassword?: string;
}

// const baseUrl = process.env.VERCEL_URL
//   ? `https://${process.env.VERCEL_URL}`
//   : '';

export const EmailTemplate = ({
  username,
  yourPassword,
}: EmailTemplateProps) => {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>Dropbox reset your password</Preview>
        <Container style={container}>
          {/* <Img
            src={`${baseUrl}/static/dropbox-logo.png`}
            width="40"
            height="33"
            alt="Dropbox"
          /> */}
          <Section>
            <Text style={text}>Olá {username},</Text>
            <Text style={text}>
              Parece que você esqueceu sua senha. Não se preocupe! Aqui está a
              sua senha: {yourPassword}
            </Text>
            <Text style={text}>
              Clique no botão abaixo para fazer login e alterar sua senha no
              menu de configuração.
            </Text>
            <Button
              style={button}
              target="_blank"
              href="https://localhost:3000/login/cidadao">
              Login
            </Button>
            <Text style={text}>
              Para manter sua conta segura, não encaminhe este e-mail a ninguém.
              Nós recomendamos que após a alteração da senha, você exclua este
              e-mail.
            </Text>
            <Text style={text}>O CESOP está sempre pronto para te servir!</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

EmailTemplate.PreviewProps = {
  userFirstname: "Alan",
  resetPasswordLink: "https://dropbox.com",
} as EmailTemplateProps;

export default EmailTemplate;

const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  padding: "45px",
};

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px",
};

const button = {
  backgroundColor: "#007ee6",
  borderRadius: "4px",
  color: "#fff",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "210px",
  padding: "14px 7px",
};
