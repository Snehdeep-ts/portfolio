'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';

const Admin = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /admin/index.html
    router.push('/admin/index.html');
  }, []);

  return (
    <>
      <Head>
        <title>Admin | CMS</title>
      </Head>
      <div>Loading Admin...</div>
    </>
  );
};

export default Admin;
