import { Inter } from 'next/font/google';
import UserCard from '../app/components/UserCard';
import PageHeader from '../app/components/PageHeader';
import { useState } from 'react';
import { User } from '../app/types';
import { getUsers } from '@/app/lib/service';
import Loader from '../app/components/Loader';
import { GetServerSideProps, Metadata } from 'next';
import '../app/globals.css';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

type PageProps = {
    users: User[];
    error: boolean;
};

export const getServerSideProps = (async () => {
    try {
        const res = await getUsers(1);
        const users: User[] = await res.data.data;
        // Pass data to the page via props
        return { props: { users, error: false } };
    } catch {
        return { props: { users: [], error: true } };
    }
}) satisfies GetServerSideProps<PageProps>;

export default function Users({ users, error }: PageProps) {
    // component states
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [currentUsers, setUsers] = useState<User[]>(users);
    const [isError, setIsError] = useState(error);

    // user load

    const loadNextPage = async () => {
        try {
            setIsLoading(true);
            let res = await getUsers(page + 1);
            setUsers((state) => [...state, ...res.data.data]);
            setPage((page) => page + 1);
            setMaxPage(res.data.total_pages);
        } catch {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Head>
                <title>Users display</title>
                <meta name='description' content='Users display' />
            </Head>
            <main
                className={`flex min-h-screen flex-col items-center p-4 ${inter.className} bg-white`}>
                {/* Page description */}
                <PageHeader
                    title='Users Display'
                    description='Display view of users from https://reqres.in/'
                />

                <section className='relative md:min-w-[700] max-w-7xl mx-auto px-4 focus:outline-none sm:px-3 md:px-4'>
                    {/* User list */}

                    {!isError && (
                        <div className='grid grid-cols-1 gap-4 lg:gap-6 sm:grid-cols-2 lg:grid-cols-2 max-h-full overflow-auto'>
                            {currentUsers.map((user) => (
                                <UserCard user={user} key={user.id} />
                            ))}
                        </div>
                    )}

                    {isError && <p>Failed to load users</p>}

                    {/* loading */}

                    {isLoading && <Loader />}

                    {/* Load more button */}
                    <div className='inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-white pt-8 pb-8 pointer-events-none sticky transition-opacity duration-300 opacity-100'>
                        <button
                            type='button'
                            onClick={async () => {
                                await loadNextPage();
                            }}
                            disabled={isLoading || page == maxPage || isError}
                            className='relative bg-teal-800 hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 text-sm text-white font-semibold h-12 px-6 rounded-lg flex items-center dark:bg-slate-700 dark:hover:bg-slate-600 transition-transform pointer-events-auto disabled:bg-teal-50 disabled:text-slate-500 disabled:border-slate-200'>
                            Load more
                        </button>
                    </div>
                </section>
            </main>
        </>
    );
}
