import { accountsList } from '@/data/accounts'

const Page = () => {
  const list = accountsList

  return (
    <main>
      {list.map((account) => (
        <div key={`account_${account.code}`}>
          <h2>{account.name}</h2>
          <p>{account.code}</p>
          <p>{account.bank}</p>
        </div>
      ))}
    </main>
  )
}

export default Page
