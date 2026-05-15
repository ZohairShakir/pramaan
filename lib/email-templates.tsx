import * as React from 'react';

interface ProofEmailProps {
  recipientName: string;
  issuerName: string;
  documentName: string;
  verifyUrl: string;
  registryId: string;
}

export const ProofEmailTemplate: React.FC<Readonly<ProofEmailProps>> = ({
  recipientName,
  issuerName,
  documentName,
  verifyUrl,
  registryId,
}) => (
  <div style={{
    fontFamily: 'Inter, system-ui, sans-serif',
    backgroundColor: '#ffffff',
    color: '#000000',
    padding: '40px',
    maxWidth: '600px',
    margin: '0 auto',
    border: '1px solid #f0f0f0',
    borderRadius: '24px'
  }}>
    <div style={{ marginBottom: '40px', textAlign: 'center' }}>
      <div style={{ 
        width: '48px', 
        height: '48px', 
        backgroundColor: '#000000', 
        borderRadius: '12px',
        display: 'inline-block'
      }}>
        {/* Placeholder for Logo */}
      </div>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '20px', letterSpacing: '-0.02em' }}>PRAMAAN</h1>
      <p style={{ fontSize: '10px', fontWeight: 'bold', color: '#999', textTransform: 'uppercase', letterSpacing: '0.3em' }}>Global Registry Node</p>
    </div>

    <div style={{ marginBottom: '40px' }}>
      <p style={{ fontSize: '16px', lineHeight: '1.6' }}>Hello <strong>{recipientName}</strong>,</p>
      <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
        An institutional-grade proof has been anchored in your name by <strong>{issuerName}</strong>. 
        This document is now cryptographically immutable and verified on the global registry.
      </p>
    </div>

    <div style={{ 
      backgroundColor: '#f8f8f8', 
      padding: '30px', 
      borderRadius: '20px', 
      marginBottom: '40px',
      border: '1px solid #efefef'
    }}>
      <p style={{ margin: '0 0 10px 0', fontSize: '10px', fontWeight: 'bold', color: '#999', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Record Asset</p>
      <p style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 'bold' }}>{documentName}</p>
      
      <p style={{ margin: '0 0 10px 0', fontSize: '10px', fontWeight: 'bold', color: '#999', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Registry ID</p>
      <p style={{ margin: '0', fontSize: '14px', fontWeight: 'bold', fontFamily: 'monospace' }}>#{registryId.toUpperCase()}</p>
    </div>

    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
      <a href={verifyUrl} style={{
        backgroundColor: '#000000',
        color: '#ffffff',
        padding: '20px 40px',
        borderRadius: '16px',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '16px',
        display: 'inline-block',
        boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
      }}>
        Explore Entry
      </a>
    </div>

    <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '30px', textAlign: 'center' }}>
      <p style={{ fontSize: '12px', color: '#999', margin: '0' }}>
        Secured by ZK-Hash Protocol v2.4 • Powered by Polygon
      </p>
    </div>
  </div>
);

interface WelcomeEmailProps {
  userName: string;
}

export const WelcomeEmailTemplate: React.FC<Readonly<WelcomeEmailProps>> = ({
  userName,
}) => (
  <div style={{
    fontFamily: 'Inter, system-ui, sans-serif',
    backgroundColor: '#ffffff',
    color: '#000000',
    padding: '40px',
    maxWidth: '600px',
    margin: '0 auto',
    border: '1px solid #f0f0f0',
    borderRadius: '24px'
  }}>
    <div style={{ marginBottom: '40px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', letterSpacing: '-0.02em' }}>Welcome to PRAMAAN</h1>
      <p style={{ fontSize: '10px', fontWeight: 'bold', color: '#999', textTransform: 'uppercase', letterSpacing: '0.3em' }}>Institutional Access Granted</p>
    </div>

    <p style={{ fontSize: '16px', lineHeight: '1.6' }}>Hello <strong>{userName}</strong>,</p>
    <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
      Your organization is now part of the global layer of trust. You can now issue, manage, and verify 
      institutional assets with cryptographic finality.
    </p>

    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <a href="https://pramaanfr.vercel.app/dashboard" style={{
        backgroundColor: '#000000',
        color: '#ffffff',
        padding: '16px 32px',
        borderRadius: '12px',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '14px',
        display: 'inline-block'
      }}>
        Open Dashboard
      </a>
    </div>
  </div>
);

interface OTPEmailProps {
  otpCode: string;
}

export const OTPEmailTemplate: React.FC<Readonly<OTPEmailProps>> = ({
  otpCode,
}) => (
  <div style={{
    fontFamily: 'Inter, system-ui, sans-serif',
    backgroundColor: '#ffffff',
    color: '#000000',
    padding: '40px',
    maxWidth: '600px',
    margin: '0 auto',
    border: '1px solid #f0f0f0',
    borderRadius: '24px'
  }}>
    <div style={{ marginBottom: '40px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', letterSpacing: '-0.02em' }}>Identity Verification</h1>
      <p style={{ fontSize: '10px', fontWeight: 'bold', color: '#999', textTransform: 'uppercase', letterSpacing: '0.3em' }}>Institutional Protocol v2.1</p>
    </div>

    <p style={{ fontSize: '16px', lineHeight: '1.6' }}>Please use the following cryptographic code to verify your institutional identity:</p>

    <div style={{ 
      backgroundColor: '#f8f8f8', 
      padding: '40px', 
      borderRadius: '20px', 
      textAlign: 'center',
      margin: '30px 0',
      border: '1px solid #efefef'
    }}>
      <span style={{ 
        fontSize: '48px', 
        fontWeight: 'bold', 
        letterSpacing: '0.3em',
        fontFamily: 'monospace'
      }}>
        {otpCode}
      </span>
    </div>

    <p style={{ fontSize: '12px', color: '#999', textAlign: 'center' }}>
      This code will expire in 10 minutes. If you did not request this, please ignore this email.
    </p>
  </div>
);

interface VerifiedEmailProps {
  userName: string;
}

export const VerifiedEmailTemplate: React.FC<Readonly<VerifiedEmailProps>> = ({
  userName,
}) => (
  <div style={{
    fontFamily: 'Inter, system-ui, sans-serif',
    backgroundColor: '#ffffff',
    color: '#000000',
    padding: '40px',
    maxWidth: '600px',
    margin: '0 auto',
    border: '1px solid #f0f0f0',
    borderRadius: '24px'
  }}>
    <div style={{ marginBottom: '40px', textAlign: 'center' }}>
      <div style={{ 
        width: '64px', 
        height: '64px', 
        backgroundColor: '#D9FF54', 
        borderRadius: '20px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px'
      }}>
        <div style={{ width: '32px', height: '32px', backgroundColor: '#000000', borderRadius: '8px' }} />
      </div>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', letterSpacing: '-0.02em' }}>Identity Verified</h1>
      <p style={{ fontSize: '10px', fontWeight: 'bold', color: '#999', textTransform: 'uppercase', letterSpacing: '0.3em' }}>Institutional Access Active</p>
    </div>

    <p style={{ fontSize: '16px', lineHeight: '1.6' }}>Hello <strong>{userName}</strong>,</p>
    <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
      Great news! Your institutional identity has been successfully audited and verified by the Pramaan Administration.
    </p>
    <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
      You now have full authority to anchor document proofs to the global registry and manage institutional assets.
    </p>

    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <a href="https://pramaanfr.vercel.app/create" style={{
        backgroundColor: '#000000',
        color: '#ffffff',
        padding: '20px 40px',
        borderRadius: '16px',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '16px',
        display: 'inline-block',
        boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
      }}>
        Issue Your First Proof
      </a>
    </div>

    <div style={{ borderTop: '1px solid #f0f0f0', marginTop: '40px', paddingTop: '30px', textAlign: 'center' }}>
      <p style={{ fontSize: '12px', color: '#999', margin: '0' }}>
        Registry Protocol v2.4 • Secured by Polygon
      </p>
    </div>
  </div>
);
