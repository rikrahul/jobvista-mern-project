import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
});

// Create PDFReport component
const PDFReport = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Image src={data.companyLogo} style={styles.image} />
        <Text>Job Id: {data.jobId}</Text>
        <Text>Job Title: {data.jobTitle}</Text>
        <Text>Company Name: {data.companyName}</Text>
        <Text>Job Location: {data.jobLocation}</Text>
        <Text>Salary: {data.minPrice} - {data.maxPrice}</Text>
        <Text>Posting Date: {data.postingDate}</Text>
      </View>
      <View style={styles.section}>
        <Text>Applicant ID: {data.id}</Text>
        <Text>Name: {data.name}</Text>
        <Text>Email: {data.email}</Text>
        <Text>Phone: {data.phone}</Text>
        <Text>Cover Letter: {data.coverLetter}</Text>
        <Text>Date & Time: {new Date(data.createAt).toLocaleString()}</Text>
      </View>
    </Page>
  </Document>
);

export default PDFReport;
