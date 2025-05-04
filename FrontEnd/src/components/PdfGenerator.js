import React from 'react';
import { Page, Text, View, Document, PDFViewer, StyleSheet, Image } from '@react-pdf/renderer';
import crimeShieldImage from '../Images/login-image.jpg';
import ReactDOM from 'react-dom';
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 40,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  crimeShieldImage: {
    width: 80,
    height: 80,
  },
  crimeShieldText: {
    fontSize: 36,
    backgroundColor: '',
    fontWeight: 'bold',
    marginTop: 10,
    textDecoration: 'underline',
  },
  section: {
    marginBottom: 40,
  },
  sectionTitleContainer: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 5,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 25,
    fontWeight: 'bold',
    textDecoration: 'underline',
    backgroundColor: 'red',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    width: '40%',
    fontWeight: 'bold',
    left:30
    
  },
  value: {
    width: '60%',
    left:70
    
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 10,
    color: 'gray',
  },
  digitalSignature: {
    bottom: 10,
    fontSize: 12,
    marginTop: 70,
    textAlign: 'center',
    
  },
});

const PdfGenerator = ({ firData }) => {
  return (
    <PDFViewer style={{ width: '100%', height: '100vh' }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Image style={styles.crimeShieldImage} src={crimeShieldImage} />
            <Text style={styles.crimeShieldText}>Crime Shield</Text>
          </View>
          <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>FIR Details</Text>
    
            <View style={styles.row}>
              <Text style={styles.label}>FIR ID:</Text>
              <Text style={styles.value}>{firData.fid}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>FIR Register Date:</Text>
              <Text style={styles.value}>{firData.firRegisterDate}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Criminal Name:</Text>
              <Text style={styles.value}>{firData.criminalName}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Crime Type:</Text>
              <Text style={styles.value}>{firData.crimeType}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Crime Weapon:</Text>
              <Text style={styles.value}>{firData.crimeWeapon}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Court Location:</Text>
              <Text style={styles.value}>{firData.courtLocation}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Criminal Location:</Text>
              <Text style={styles.value}>{firData.criminalLocation}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Crime Location:</Text>
              <Text style={styles.value}>{firData.crimeLocation}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Crime Status:</Text>
              <Text style={styles.value}>{firData.crimeStatus}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Criminal DOB:</Text>
              <Text style={styles.value}>{firData.criminalDob}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Victim Address:</Text>
              <Text style={styles.value}>{firData.victimAddress}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Victim Name:</Text>
              <Text style={styles.value}>{firData.victimName}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Victim Phone:</Text>
              <Text style={styles.value}>{firData.victimPhone}</Text>
              </View>
            </View>
            <Text style={styles.digitalSignature}>This document is computer generated and does not require any signature or stamp in order to be considered valid</Text>
          </View>
          <Text style={styles.footer}>
            This document is confidential and intended solely for the use of the individual or entity to whom it is
            addressed. Any unauthorized review, use, disclosure, or distribution is prohibited. Please treat the
            information with utmost confidentiality and discretion. By accepting and viewing this document, you agree
            to abide by these terms.
          </Text>
          
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PdfGenerator;
