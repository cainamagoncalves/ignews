import { useSession, signIn } from 'next-auth/client';
import { useRouter } from 'next/router';
import { api } from '../../services/api'
import { getStripeJs } from '../../services/stripe-js';

import styles from './styles.module.scss'

interface SubscribeButtonProps {
  priceId: string;
}

// getServerSideProps (SSR)
// getServerStaticProps (SSG)
// API routes


export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const [session] = useSession()
  const router = useRouter()

  async function handleSubscribe() {

    if (!session) {
      signIn('github') // CASO USUÁRIO NÃO ESTEJA LOGADO
      return;
    }

    if (session.activeSubscription) {
      router.push('/posts')
      return;
    } 

    try {
      const response = await api.post('/subscribe')

      const { sessionId } = response.data;

      
      const stripe = await getStripeJs() // PEGAR USUÁRIO LOGADO

      await stripe.redirectToCheckout({ sessionId }) // REDIRECIONAR USUÁRIO
      
    } catch (err) {
      alert(err.message);
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