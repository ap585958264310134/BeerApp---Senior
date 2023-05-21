import { useOnline } from 'hooks/useOnline';

const Offline = () => {
  const isOnline = useOnline();

  return isOnline ? null : (
    <article>
      <section>
        <header>
          <h1>You are offline</h1>
        </header>
      </section>
    </article>
  );
};

export default Offline;
