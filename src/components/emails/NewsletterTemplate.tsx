import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Section,
  Text,
} from "@react-email/components";

export interface NewsletterProps {
  preheader: string;
  content: {
    title: string;
    body: string;
    ctaText?: string;
    ctaUrl?: string;
  };
}

export default function NewsletterTemplate({
  preheader,
  content,
}: NewsletterProps) {
  return (
    <Html>
      <Head>
        <title>{content.title}</title>
        <meta name="preheader" content={preheader} />
      </Head>
      <Body
        style={{ backgroundColor: "#f6f9fc", fontFamily: "Arial, sans-serif" }}
      >
        <Container
          style={{ margin: "0 auto", padding: "20px 0", maxWidth: "600px" }}
        >
          <Section
            style={{
              backgroundColor: "#ffffff",
              padding: "40px",
              borderRadius: "4px",
            }}
          >
            <Img
              src="https://yoursite.com/logo.png"
              alt="Your Logo"
              width="120"
              height="40"
              style={{ margin: "0 auto 20px" }}
            />
            <Text
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {content.title}
            </Text>
            <Text
              style={{ fontSize: "16px", lineHeight: "1.6", color: "#444444" }}
            >
              {content.body}
            </Text>
            {content.ctaText && content.ctaUrl && (
              <Button
                style={{
                  backgroundColor: "#0070f3",
                  color: "#ffffff",
                  padding: "12px 24px",
                  borderRadius: "4px",
                  textDecoration: "none",
                  textAlign: "center",
                  display: "block",
                  margin: "30px auto",
                  maxWidth: "200px",
                }}
                href={content.ctaUrl}
              >
                {content.ctaText}
              </Button>
            )}
          </Section>
          <Section style={{ padding: "20px", textAlign: "center" }}>
            <Text style={{ fontSize: "12px", color: "#8898aa" }}>
              © {new Date().getFullYear()} Your Name. All rights reserved.
            </Text>
            <Text style={{ fontSize: "12px", color: "#8898aa" }}>
              <Link
                href="https://yoursite.com/unsubscribe"
                style={{ color: "#8898aa" }}
              >
                Unsubscribe
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
