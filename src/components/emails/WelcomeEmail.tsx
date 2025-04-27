import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface WelcomeEmailProps {
  userEmail?: string;
}

export const WelcomeEmail = ({
  userEmail = "subscriber@example.com",
}: WelcomeEmailProps) => {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  return (
    <Html>
      <Head />
      <Preview>Welcome to my Portfolio Newsletter</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`${baseUrl}/logo.png`}
            width="42"
            height="42"
            alt="Logo"
            style={{ margin: "0 auto" }}
          />
          <Heading style={heading}>Welcome to my Newsletter!</Heading>
          <Text style={paragraph}>
            Thanks for subscribing to my newsletter. I'm excited to share my
            journey, insights, and projects with you.
          </Text>

          <Section style={statsContainer}>
            <Section style={statBox}>
              <Text style={statNumber}>3+</Text>
              <Text style={statLabel}>Years Experience</Text>
            </Section>
            <Section style={statBox}>
              <Text style={statNumber}>2</Text>
              <Text style={statLabel}>Companies</Text>
            </Section>
            <Section style={statBox}>
              <Text style={statNumber}>10+</Text>
              <Text style={statLabel}>Projects Completed</Text>
            </Section>
            <Section style={statBox}>
              <Text style={statNumber}>15+</Text>
              <Text style={statLabel}>Tech Skills</Text>
            </Section>
          </Section>

          <Text style={paragraph}>
            As a subscriber, you'll receive updates about:
          </Text>

          <ul style={list}>
            <li style={listItem}>New blog posts and technical tutorials</li>
            <li style={listItem}>Project showcases and case studies</li>
            <li style={listItem}>Industry insights and best practices</li>
            <li style={listItem}>Exclusive resources and tips</li>
          </ul>

          <Section style={buttonContainer}>
            <Button style={{ ...button, padding: "12px 20px" }} href={baseUrl}>
              Visit Portfolio
            </Button>
            <Button
              style={{
                ...button,
                backgroundColor: "#4a5568",
                marginLeft: "12px",
                padding: "12px 20px",
              }}
              href={`${baseUrl}/blog`}
            >
              Read Blog
            </Button>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            You're receiving this email because you subscribed to my newsletter
            with {userEmail}. If you'd prefer not to receive these emails, you
            can{" "}
            <Link
              style={link}
              href="`${baseUrl}/unsubscribe?email=${userEmail}`"
            >
              unsubscribe here
            </Link>
            .
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default WelcomeEmail;

// Styles
const main = {
  backgroundColor: "#f9fafb",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "600px",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
};

const heading = {
  fontSize: "24px",
  fontWeight: "600",
  lineHeight: "1.3",
  color: "#1a202c",
  textAlign: "center" as const,
  margin: "30px 0",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "1.6",
  color: "#4a5568",
  margin: "16px 0",
};

const statsContainer = {
  display: "flex",
  justifyContent: "space-between",
  margin: "30px auto",
  maxWidth: "500px",
};

const statBox = {
  textAlign: "center" as const,
  minWidth: "80px",
};

const statNumber = {
  fontSize: "22px",
  fontWeight: "bold",
  color: "#2d3748",
  margin: "0",
};

const statLabel = {
  fontSize: "14px",
  color: "#718096",
  margin: "0",
};

const list = {
  margin: "24px 0",
};

const listItem = {
  fontSize: "16px",
  lineHeight: "1.6",
  color: "#4a5568",
  margin: "8px 0",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#3182ce",
  borderRadius: "4px",
  color: "#fff",
  fontSize: "14px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
};

const hr = {
  borderColor: "#e2e8f0",
  margin: "32px 0",
};

const footer = {
  fontSize: "14px",
  color: "#718096",
  margin: "32px 0 0 0",
  textAlign: "center" as const,
};

const link = {
  color: "#3182ce",
  textDecoration: "underline",
};
