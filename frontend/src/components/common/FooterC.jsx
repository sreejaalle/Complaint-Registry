import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';

export default function FooterC() {
  return (
    <MDBFooter className='footer-dark text-center text-white py-4'>
      <div>
        <p className='mb-1 footer-brand'>ComplaintCare</p>
        <p className='mb-0'>&copy; {new Date().getFullYear()}</p>
      </div>
    </MDBFooter>
  );
}
