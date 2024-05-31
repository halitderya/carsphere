export default function Page({ params }: { params: { reg: string } }) {
  return <div>My Post: {params.reg}</div>;
}
