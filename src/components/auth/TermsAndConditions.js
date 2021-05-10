import React, { useEffect } from 'react';
import NavbarGuest from '../layout/NavbarGuest';

const TermsAndConditions = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <NavbarGuest />
      <div className='privacy-container'>
        <div className='privacy-heading'>
          <h1>Vanity™ Terms and Conditions</h1>
        </div>
        <div className='privacy-content'>
          <p>
            These terms and conditions of use (the “terms” or “Agreement”)
            govern Our social media website, accounts, pages and applications (
            or collectively, our “sites) that belong to, are managed by Nitara
            Enterprises, a social networking platform.
            <br />
            <br />
            By accessing and or using our sites, you are agreeing to be bound by
            these terms, all applicable laws and regulations, and any other
            applicable policies, terms and guidelines established by Vanity and
            those of any third parties that host our sites, as amended from time
            to time.  If you do not agree with all of these terms or cannot form
            a legally binding contract, you are not permitted to use our sites.
          </p>
          <br />
          <div>
            <h3>Basic Terms:</h3>
            <p>
              By using vanity.ac website you are agreeing to be bound by the
              following terms and conditions (“Terms of Use”)
            </p>
            <ul className='privacy-list-main'>
              <li>You must be 16 years or older to use this site.</li>
              <li>
                You own all of the content, feedback and personal information
                you provide to us, but you also grant us a non-exclusive license
                to it.
              </li>
              <li>
                You are responsible for any activity that occurs under your
                screen name.
              </li>
              <li>You are responsible for keeping your password secure.</li>
              <li>
                <h4>Posting Content to Our sites:</h4>
                <ul className='privacy-list'>
                  <li>Be respectful – maintain a friendly environment.</li>
                  <li>
                    Stay relevant – stay on topic with relevant information that
                    others may find useful.
                  </li>
                  <li>Do not post advertisements</li>
                  <li>
                    You must not abuse, harass, threaten, impersonate or
                    intimidate other vanity users.
                  </li>
                  <li>
                    You must not place false or misleading information on our
                    website or upload any computer programs – including but not
                    limited to viruses, worms, trojan horses.
                  </li>
                </ul>
              </li>
              <li>
                We reserve the right to remove comments and/or posts. We also
                reserve the right to restrict users who don’t follow these
                guidelines, have online pages containing offensive material
                and/content, or for any other reason.
              </li>
            </ul>
          </div>
          <br />
          <div>
            <h3>Privacy:</h3>
            <ul className='privacy-list-main'>
              <li>
                Do not send or post personal information via our social media
                sites. Never disclose any financial or personal information on
                vanity.
              </li>
              <li>
                Vanity will never ask you for your account information,
                passwords, PINs or other personally identifiable information via
                social media or email.
              </li>
            </ul>
            <br />
            <p>
              You acknowledge that you assume all responsibility related to the
              security, privacy and risks inherent in sending any content over
              the Internet. vanity is not responsible for the privacy or
              security practices of the social media sites we utilize. Please
              review their policies.
            </p>
          </div>
          <br />
          <div>
            <h3>Copywrite/Use License:</h3>
            <ul className='privacy-list-main'>
              <li>
                Vanity does not claim any ownership rights in text, files,
                images, videos, soundtracks, blogs, works of authorship,
                applications or any other materials (collectively, “content”)
                that you post on or through the vanity services.
              </li>
              <li>
                You own the content posted by you on or through the vanity
                services.
              </li>
              <li>
                Do not post other content as yours own, if we find so, you grant
                us the permission to review it and possibly remove the content
                till we find the rightful ownership of the content.
              </li>
              <li>
                On repeatable use of others content, vanity can terminate the
                contract of user and remove the users.
              </li>
            </ul>
            <br />
            <p>
              Vanity reserves the right, from time to time, with or without
              notice to you, to make changes to this agreement in Vanity’s sole
              discretion. Continued use of any part of this website constitutes
              your acceptance of such changes. The most current version of this
              agreement, which supersedes all previous versions, can be reviewed
              by clicking on the terms of use hyperlink located at the bottom of
              the first page on this website.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsAndConditions;
