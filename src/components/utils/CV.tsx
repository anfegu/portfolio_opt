import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import { useTranslation } from '../../context/TranslationContext';
import { useEffect, useState } from 'react';

const styles = StyleSheet.create({
  page: {
    padding: 50,
    backgroundColor: '#FFFFFF'
  },
  headerSection: {
    marginBottom: 30,
    textAlign: 'center'
  },
  name: {
    fontSize: 32,
    marginBottom: 10,
    color: '#1a365d',
    fontFamily: 'Helvetica-Bold'
  },
  role: {
    fontSize: 18,
    color: '#2563eb',
    marginBottom: 5,
    fontFamily: 'Helvetica'
  },
  contact: {
    fontSize: 12,
    color: '#4a5568',
    marginBottom: 4,
    fontFamily: 'Helvetica'
  },
  contactLabel: {
    fontFamily: 'Helvetica-Bold'
  },
  section: {
    marginBottom: 25
  },
  sectionTitle: {
    fontSize: 20,
    color: '#1e40af',
    marginBottom: 15,
    fontFamily: 'Helvetica-Bold',
    borderBottom: 2,
    borderColor: '#e2e8f0',
    paddingBottom: 5
  },
  jobTitle: {
    fontSize: 14,
    color: '#2563eb',
    marginBottom: 5,
    fontFamily: 'Helvetica-Bold'
  },
  company: {
    fontSize: 13,
    color: '#4a5568',
    marginBottom: 8,
    fontFamily: 'Helvetica'
  },
  bullet: {
    fontSize: 12,
    marginLeft: 15,
    marginBottom: 5,
    fontFamily: 'Helvetica',
    lineHeight: 1.4
  },
  skillGroup: {
    marginBottom: 10
  },
  skillTitle: {
    fontSize: 13,
    color: '#2563eb',
    marginBottom: 5,
    fontFamily: 'Helvetica-Bold'
  },
  skillText: {
    fontSize: 12,
    color: '#1a202c',
    fontFamily: 'Helvetica'
  }
});

interface PDFProps {
  content: {
    role: string;
    specialization: string;
    summary: string;
    sections: {
      summary: string;
      experience: string;
      skills: string;
      languages: string;
      education: string;
    };
    education: {
      degree: string;
      university: string;
      location: string;
      year: string;
    };
    jobs: Array<{
      title: string;
      company: string;
      location: string;
      period: string;
      bullets: string[];
    }>;
    skills: {
      blockchain: string;
      backend: string;
      fullstack: string;
      devops: string;
      design: string;
    };
    languages: {
      english: string;
      spanish: string;
      professional: string;
      native: string;
    };
  };
}

const PDFDocument = ({ content }: PDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.headerSection}>
        <Text style={styles.name}>Andrés Gutiérrez</Text>
        <Text style={styles.role}>{content.role}</Text>
        <Text style={styles.role}>{content.specialization}</Text>
        <Text style={styles.contact}>
          <Text style={styles.contactLabel}>Email: </Text>
          anfegu86@gmail.com
        </Text>
        <Text style={styles.contact}>
          <Text style={styles.contactLabel}>GitHub: </Text>
          github.com/anfegu
        </Text>
        <Text style={styles.contact}>
          <Text style={styles.contactLabel}>LinkedIn: </Text>
          linkedin.com/in/anfegu
        </Text>
        <Text style={styles.contact}>
          <Text style={styles.contactLabel}>Location: </Text>
          Colombia
        </Text>
      </View>

      {/* Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{content.sections.summary}</Text>
        <Text style={styles.bullet}>{content.summary}</Text>
      </View>

      {/* Education */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{content.sections.education}</Text>
        <Text style={styles.jobTitle}>{content.education.degree}</Text>
        <Text style={styles.company}>
          {content.education.university} - {content.education.location} ({content.education.year})
        </Text>
      </View>

      {/* Experience */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{content.sections.experience}</Text>

        {content.jobs.map((job, index) => (
          <View key={index} style={{ marginBottom: 20 }}>
            <Text style={styles.jobTitle}>
              {job.title} ({job.period})
            </Text>
            <Text style={styles.company}>
              {job.company} - {job.location}
            </Text>
            {job.bullets.map((bullet, i) => (
              <Text key={i} style={styles.bullet}>• {bullet}</Text>
            ))}
          </View>
        ))}
      </View>

      {/* Skills */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{content.sections.skills}</Text>
        <View style={styles.skillGroup}>
          <Text style={styles.skillTitle}>{content.skills.blockchain}</Text>
          <Text style={styles.skillText}>Smart Contracts, Cross-Chain, IBC, Solana, EVM</Text>
        </View>
        <View style={styles.skillGroup}>
          <Text style={styles.skillTitle}>{content.skills.backend}</Text>
          <Text style={styles.skillText}>Rust, Axum, AWS Lambda, Microservices</Text>
        </View>
        <View style={styles.skillGroup}>
          <Text style={styles.skillTitle}>{content.skills.fullstack}</Text>
          <Text style={styles.skillText}>React, Flutter, TypeScript, Node.js, DApp Integration</Text>
        </View>
        <View style={styles.skillGroup}>
          <Text style={styles.skillTitle}>{content.skills.devops}</Text>
          <Text style={styles.skillText}>AWS, Serverless, CI/CD, High Availability</Text>
        </View>
        <View style={styles.skillGroup}>
          <Text style={styles.skillTitle}>{content.skills.design}</Text>
          <Text style={styles.skillText}>Microservices, API Design, Distributed Systems</Text>
        </View>
      </View>

      {/* Languages */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{content.sections.languages}</Text>
        <Text style={styles.bullet}>• {content.languages.english} - {content.languages.professional}</Text>
        <Text style={styles.bullet}>• {content.languages.spanish} - {content.languages.native}</Text>
      </View>
    </Page>
  </Document>
);

const DownloadButton = () => {
  const { currentLang, translate } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState<PDFProps['content']>({
    role: '',
    specialization: '',
    summary: '',
    sections: {
      summary: '',
      experience: '',
      skills: '',
      languages: '',
      education: ''
    },
    education: {
      degree: '',
      university: '',
      location: '',
      year: '2014'
    },
    jobs: [] as Array<{
      title: string;
      company: string;
      location: string;
      period: string;
      bullets: string[];
    }>,
    skills: {
      blockchain: '',
      backend: '',
      fullstack: '',
      devops: '',
      design: ''
    },
    languages: {
      english: '',
      spanish: '',
      professional: '',
      native: ''
    }
  });

  useEffect(() => {
    const loadTranslations = async () => {
      setIsLoading(true);
      try {
        const translated = {
          role: await translate("Senior Software Engineer"),
          specialization: await translate("Specialized in Blockchain, Financial Systems and Fullstack Development"),
          summary: await translate("Senior Full Stack Developer with over 10 years of experience specializing in Blockchain Technology, Financial Systems, and Enterprise Solutions. Expert in developing cross-chain solutions, smart contracts, and high-performance distributed systems."),
          sections: {
            summary: await translate("Professional Summary"),
            experience: await translate("Professional Experience"),
            skills: await translate("Technical Skills"),
            languages: await translate("Languages"),
            education: await translate("Education")
          },
          education: {
            degree: await translate("Software Engineering"),
            university: await translate("La Salle University"),
            location: await translate("Colombia"),
            year: "2014"
          },
          jobs: [
            {
              title: await translate("Senior Fullstack Developer"),
              company: await translate("Freelance & Local Companies"),
              location: "Colombia",
              period: "2024",
              bullets: [
                await translate("Developed enterprise applications using Functional Programming principles"),
                await translate("Built cross-platform mobile applications with Flutter and AWS backend"),
                await translate("Implemented serverless architectures using TypeScript and AWS Lambda")
              ]
            },
            {
              title: await translate("Backend Engineer"),
              company: "AC Photo Service",
              location: await translate("Remote"),
              period: "2024",
              bullets: [
                await translate("Developed serverless image processing system with Rust and AWS Lambda"),
                await translate("Implemented microservices architecture with S3 and SQS"),
                await translate("Optimized costs and performance through asynchronous processing")
              ]
            },
            {
              title: await translate("Senior Blockchain Engineer"),
              company: "Oiga - 10Pearls",
              location: await translate("Remote"),
              period: "2023-2024",
              bullets: [
                await translate("Developed high-performance SDKs for cross-chain operations with Rust"),
                await translate("Integrated IBC protocols for communication between Cosmos, Solana, and EVM networks"),
                await translate("Implemented token bridging system using Wormhole")
              ]
            },
            {
              title: await translate("Senior Software Engineer"),
              company: "Virtualness",
              location: await translate("Silicon Valley (Remote)"),
              period: "2022-2023",
              bullets: [
                await translate("Led development of NFT e-commerce platform with 10,000 concurrent templates"),
                await translate("Developed ERC-1155 smart contracts and integration with Polygon Layer 2"),
                await translate("Implemented ERC20 minting and wallet transfer system")
              ]
            }
          ],
          skills: {
            blockchain: await translate("Blockchain Development"),
            backend: await translate("Backend Systems"),
            fullstack: await translate("Full Stack"),
            devops: await translate("Cloud & DevOps"),
            design: await translate("System Design")
          },
          languages: {
            english: await translate("English"),
            spanish: await translate("Spanish"),
            professional: await translate("Professional"),
            native: await translate("Native")
          }
        };
        setContent(translated);
      } catch (error) {
        console.error('Error loading translations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, [currentLang, translate]);

  if (isLoading) {
    return (
      <span className="text-gray-600 dark:text-gray-300">
        Loading...
      </span>
    );
  }

  return (
    <PDFDownloadLink 
      document={<PDFDocument content={content} />} 
      fileName={`Andres_Gutierrez_CV${currentLang !== 'en' ? `_${currentLang}` : ''}.pdf`}
      className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
    >
      {({ loading }) => (
        <span>
          {loading ? "Generating PDF..." : "Download CV"}
        </span>
      )}
    </PDFDownloadLink>
  );
};

export default DownloadButton;
