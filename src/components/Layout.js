import { Helmet } from 'react-helmet';
import Navbar from './Navbar';

export default function Layout({ title, keywords, description, children }) {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Helmet>

      <Navbar />
      <main className="container my-4">{children}</main>
    </>
  );
}

Layout.defaultProps = {
  title: 'TanyaJawab',
  description:
    'membuat, menjawab, vote pertanyaan lalu anda bisa menjawab pertanyaan yang anda ketahui.',
  keywords: 'programming',
};
