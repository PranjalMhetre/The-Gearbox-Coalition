import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';

export default function HomePage() {
  return (
    <>
      <Welcome />
      <ColorSchemeToggle />
      <div className='text-green-300 dark:text-red-300 text-center mt-2 '>Light === green, dark === red</div>
    </>
  );
}
