import PageCard from '@/components/PageCard';

async function loadCards() {
	
}

export default async function PagesCards() {
	const pages = await loadCards();

	return (
		<section>
		<div>
			<Navbar />
		</div>
		<div className='grid'>
			{pages.map(page =>(
				<PageCard page={page} />
			))}
		</div>
		</section>
	)
}