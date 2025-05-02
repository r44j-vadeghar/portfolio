import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

interface WelcomeEmailProps {
  userEmail?: string;
}

export const PremiumWelcomeEmail = ({
  userEmail = "subscriber@example.com",
}: WelcomeEmailProps) => {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  return (
    <Html>
      <Head />
      <Preview>Welcome to my Premium Portfolio Newsletter</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header with gradient background */}
          <Section style={header}>
            <Img
              src={`${baseUrl}/linkedin.jpg`}
              width="52"
              height="52"
              alt="Logo"
              style={{ margin: "0 auto" }}
            />
            <Heading style={headingPrimary}>Welcome to my Newsletter</Heading>
            <Text style={subtitleText}>
              Insights, tutorials & projects from a passionate developer
            </Text>
          </Section>

          {/* Hero section */}
          <Section style={heroSection}>
            <Text style={paragraphHero}>
              Thanks for subscribing to my premium newsletter. I'm thrilled to
              have you join my community of tech enthusiasts and professionals.
              Get ready for exclusive content and insights!
            </Text>
          </Section>

          {/* Stats in a modern card layout */}
          <Section style={statsWrapper}>
            <Row>
              <Column style={statColumn}>
                <Section style={statCard}>
                  <Text style={statNumber}>3+</Text>
                  <Text style={statLabel}>Years Experience</Text>
                </Section>
              </Column>
              <Column style={statColumn}>
                <Section style={statCard}>
                  <Text style={statNumber}>2</Text>
                  <Text style={statLabel}>Companies</Text>
                </Section>
              </Column>
            </Row>
            <Row style={{ marginTop: "16px" }}>
              <Column style={statColumn}>
                <Section style={statCard}>
                  <Text style={statNumber}>10+</Text>
                  <Text style={statLabel}>Projects Completed</Text>
                </Section>
              </Column>
              <Column style={statColumn}>
                <Section style={statCard}>
                  <Text style={statNumber}>15+</Text>
                  <Text style={statLabel}>Tech Skills</Text>
                </Section>
              </Column>
            </Row>
          </Section>

          {/* What to expect section */}
          <Section style={contentSection}>
            <Heading style={headingSecondary}>What You'll Receive</Heading>
            <Text style={paragraph}>
              As a premium subscriber, you'll have access to:
            </Text>

            <Section style={featureRow}>
              <Img
                src={`${baseUrl}/icon-blog.png`}
                width="24"
                height="24"
                alt="Blog"
                style={featureIcon}
              />
              <Text style={featureText}>
                <strong>In-depth technical tutorials</strong> with code examples
                and best practices
              </Text>
            </Section>

            <Section style={featureRow}>
              <Img
                src={`${baseUrl}/icon-project.png`}
                width="24"
                height="24"
                alt="Projects"
                style={featureIcon}
              />
              <Text style={featureText}>
                <strong>Case studies and project breakdowns</strong> with
                architecture decisions explained
              </Text>
            </Section>

            <Section style={featureRow}>
              <Img
                src={`${baseUrl}/icon-insight.png`}
                width="24"
                height="24"
                alt="Insights"
                style={featureIcon}
              />
              <Text style={featureText}>
                <strong>Industry insights and trends</strong> to keep you ahead
                of the curve
              </Text>
            </Section>

            <Section style={featureRow}>
              <Img
                src={`${baseUrl}/icon-resource.png`}
                width="24"
                height="24"
                alt="Resources"
                style={featureIcon}
              />
              <Text style={featureText}>
                <strong>Exclusive resources and tools</strong> only available to
                subscribers
              </Text>
            </Section>
          </Section>

          {/* CTA Buttons */}
          <Section style={ctaContainer}>
            <Button href={baseUrl} style={primaryButton}>
              Visit Portfolio
            </Button>

            <Button href={`${baseUrl}/blog`} style={secondaryButton}>
              Read Blog
            </Button>
          </Section>

          {/* Latest Content Teaser */}
          <Section style={latestContentSection}>
            <Heading style={headingSecondary}>Latest Content</Heading>

            <Section style={contentCard}>
              <Text style={contentCardTitle}>
                Setting Up AI powered Warp Terminal + Oh My Zsh on macOS: A
                Complete Guide
              </Text>
              <Text style={contentCardDesc}>
                Learn how to supercharge your Mac terminal with Warp and Oh My
                Zsh. This step-by-step guide helps developers boost productivity
                with auto-suggestions, themes, and AI features.
              </Text>
              <Link
                href={`${baseUrl}/blog/setting-up-ai-powered-warp-terminal-oh-my-zsh-on-macos-a-complete-guide`}
                style={contentCardLink}
              >
                Read Article →
              </Link>
            </Section>
          </Section>

          <Hr style={hr} />

          {/* Footer */}
          <Section style={footerSection}>
            <Text style={footerText}>
              You're receiving this email because you subscribed with{" "}
              <strong>{userEmail}</strong>.
            </Text>
            <Text style={footerLinks}>
              <Link href={`${baseUrl}/profile`} style={footerLink}>
                Update preferences
              </Link>
              {" • "}
              <Link
                href={`${baseUrl}/unsubscribe?email=${userEmail}`}
                style={footerLink}
              >
                Unsubscribe
              </Link>
            </Text>

            <Section style={socialLinks}>
              <Link href="https://x.com/VadegharRaj" style={socialIconLink}>
                <Img
                  src={`${baseUrl}/twitter.png`}
                  width="24"
                  height="24"
                  alt="Twitter"
                />
              </Link>
              <Link
                href="https://github.com/r44j-vadeghar"
                style={socialIconLink}
              >
                <Img
                  src={`${baseUrl}/github.png`}
                  width="24"
                  height="24"
                  alt="GitHub"
                />
              </Link>
              <Link
                href="https://www.linkedin.com/in/r44j/"
                style={socialIconLink}
              >
                <Img
                  src={`${baseUrl}/linkedin.png`}
                  width="24"
                  height="24"
                  alt="LinkedIn"
                />
              </Link>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default PremiumWelcomeEmail;

// Styles
const main = {
  backgroundColor: "#f8fafc",
  fontFamily:
    '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  color: "#334155",
};

const container = {
  margin: "0 auto",
  padding: "0",
  width: "100%",
  maxWidth: "600px",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  overflow: "hidden",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
};

const header = {
  backgroundColor: "#1e40af",
  backgroundImage: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
  padding: "48px 24px",
  textAlign: "center" as const,
};

const headingPrimary = {
  fontSize: "32px",
  fontWeight: "700",
  lineHeight: "1.2",
  color: "#ffffff",
  margin: "16px 0 8px",
  textAlign: "center" as const,
};

const subtitleText = {
  fontSize: "16px",
  color: "#e0f2fe",
  margin: "0",
  textAlign: "center" as const,
};

const heroSection = {
  padding: "40px 24px 24px",
  backgroundColor: "#ffffff",
  textAlign: "center" as const,
};

const paragraphHero = {
  fontSize: "17px",
  lineHeight: "1.6",
  color: "#475569",
  margin: "0",
};

const statsWrapper = {
  padding: "16px 24px 32px",
};

const statColumn = {
  width: "50%",
};

const statCard = {
  padding: "24px 16px",
  backgroundColor: "#f1f5f9",
  borderRadius: "8px",
  textAlign: "center" as const,
  height: "100%",
  boxSizing: "border-box" as const,
};

const statNumber = {
  fontSize: "28px",
  fontWeight: "700",
  color: "#1e40af",
  margin: "0 0 4px",
};

const statLabel = {
  fontSize: "14px",
  color: "#64748b",
  margin: "0",
};

const contentSection = {
  padding: "32px 24px",
  backgroundColor: "#ffffff",
};

const headingSecondary = {
  fontSize: "22px",
  fontWeight: "600",
  color: "#1e293b",
  margin: "0 0 16px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "1.6",
  color: "#475569",
  margin: "0 0 24px",
};

const featureRow = {
  display: "flex",
  margin: "16px 0",
};

const featureIcon = {
  margin: "0 12px 0 0",
  alignSelf: "flex-start",
};

const featureText = {
  fontSize: "15px",
  lineHeight: "1.5",
  color: "#475569",
  margin: "0",
};

const ctaContainer = {
  padding: "8px 24px 32px",
  textAlign: "center" as const,
};

const primaryButton = {
  backgroundColor: "#1e40af",
  backgroundImage: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
  borderRadius: "6px",
  boxShadow: "0 4px 6px rgba(59, 130, 246, 0.2)",
  marginRight: "12px",
};

const secondaryButton = {
  backgroundColor: "#f8fafc",
  color: "#1e40af",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "#cbd5e1",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
  borderRadius: "6px",
};

const latestContentSection = {
  padding: "32px 24px",
  backgroundColor: "#f1f5f9",
};

const contentCard = {
  padding: "24px",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
};

const contentCardTitle = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#1e293b",
  margin: "0 0 12px",
};

const contentCardDesc = {
  fontSize: "15px",
  lineHeight: "1.5",
  color: "#475569",
  margin: "0 0 16px",
};

const contentCardLink = {
  color: "#1e40af",
  fontWeight: "500",
  textDecoration: "none",
};

const hr = {
  borderColor: "#e2e8f0",
  margin: "0",
};

const footerSection = {
  padding: "32px 24px",
  textAlign: "center" as const,
};

const footerText = {
  fontSize: "14px",
  color: "#64748b",
  margin: "0 0 12px",
};

const footerLinks = {
  fontSize: "14px",
  color: "#64748b",
  margin: "0 0 24px",
};

const footerLink = {
  color: "#1e40af",
  textDecoration: "none",
};

const socialLinks = {
  margin: "24px 0 0",
  textAlign: "center" as const,
};

const socialIconLink = {
  display: "inline-block",
  margin: "0 8px",
};
