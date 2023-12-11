import * as React from 'react'
import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
  Link,
} from '@react-email/components'

interface YelpRecentLoginEmailProps {
  response: any
}

export const EmailTemplate: React.FC<Readonly<YelpRecentLoginEmailProps>> = ({ response }) => {
  return (
    <Html>
      <Head />
      <Preview>Yelp recent login</Preview>
      <Body style={main}>
        <Container>
          <Section style={content}>
            <Img
              width={620}
              src={'https://react-email-demo-ijnnx5hul-resend.vercel.app/static/yelp-header.png'}
            />

            <Row style={{ ...boxInfos, paddingBottom: '0' }}>
              <Column>
                <Heading
                  style={{
                    fontSize: 32,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  Hi {response.emailToSend.split('@')[0]},
                </Heading>
                <Heading
                  as="h2"
                  style={{
                    fontSize: 26,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  {response.userName} share file with you
                </Heading>

                <Text style={paragraph}>
                  <b>File Name: </b>
                  {response.fileName}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>File Size: </b>
                  {response.fileSize}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>File Type: </b>
                  {response.fileType}
                </Text>
                <Text
                  style={{
                    color: 'rgb(0,0,0, 0.5)',
                    fontSize: 14,
                    marginTop: -5,
                  }}
                >
                  *Access and Download file on your own risk
                </Text>

                <Text style={paragraph}>
                  Now you can also share file with NhatNguyen FileSharingApp
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  Click below button to access your file
                </Text>
              </Column>
            </Row>
            <Row style={{ ...boxInfos, paddingTop: '0' }}>
              <Column style={containerButton} colSpan={2}>
                <Link href={response.shortUrl} style={button}>
                  Click here to Download
                </Link>
              </Column>
            </Row>
          </Section>

          <Section style={containerImageFooter}>
            <Img
              width={620}
              src={'https://react-email-demo-ijnnx5hul-resend.vercel.app/static/yelp-footer.png'}
            />
          </Section>

          <Text
            style={{
              textAlign: 'center',
              fontSize: 12,
              color: 'rgb(0,0,0, 0.7)',
            }}
          >
            © {new Date().getFullYear()} | NhatNguyen Copyrights | www.facebook.com/nhatnguyen.KTz/
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#fff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const paragraph = {
  fontSize: 16,
}

const logo = {
  padding: '30px 20px',
}

const containerButton = {
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
}

const button = {
  backgroundColor: '#e00707',
  padding: '12px 30px',
  borderRadius: 3,
  color: '#FFF',
  fontWeight: 'bold',
  border: '1px solid rgb(0,0,0, 0.1)',
  cursor: 'pointer',
}

const content = {
  border: '1px solid rgb(0,0,0, 0.1)',
  borderRadius: '3px',
  overflow: 'hidden',
}

const boxInfos = {
  padding: '20px 40px',
}

const containerImageFooter = {
  padding: '45px 0 0 0',
}
