import { useSession, signIn } from 'next-auth/client';
import styles from './styles.module.scss'

interface SubscribeButtonProps {
  priceId: string;
}

// getServerSideProps (SSR)
// getServerStaticProps (SSG)
// API routes


export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const [session] = useSession()

  function handleSubscribe() {

    if (!session) {
      signIn('github')
      return;
    }


  }

  return (
    <button 
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe Now
    </button>
  );
}