import Link from 'next/link';

const Navbar = () => {
  return (
    <nav>
      <ul className='flex gap-8 text-gray-600'>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/payment">Order</Link>
        </li>
        <li>
          <Link href="/history">History</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;