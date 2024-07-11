'use client';

import { Inter } from 'next/font/google';
import UserCard from '../components/UserCard';
import PageHeader from '../components/PageHeader';
import { useEffect, useState } from 'react';
import { User } from '../types';
import { getUsers } from '../lib/service';
import Loader from '../components/Loader';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export default function Users() {
    // component states
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState<User[]>([]);

    // user load
    useEffect(() => {
        setIsLoading(true);
        getUsers(page).then((data) => {
            setIsLoading(false);
            setMaxPage(data.data.total_pages);
            setUsers((state) => [...state, ...data.data.data]);
        });
    }, [page]);

    return (
        <>
            <main
                className={`flex min-h-screen flex-col items-center p-4 ${inter.className} bg-white`}>
                {/* Page description */}
                <PageHeader
                    title='Users Display'
                    description='Display view of users from https://reqres.in/'
                />

                <section className='relative md:min-w-[700] max-w-7xl mx-auto px-4 focus:outline-none sm:px-3 md:px-4'>
                    {/* User list */}
                    <div className='grid grid-cols-1 gap-4 lg:gap-6 sm:grid-cols-2 lg:grid-cols-2 max-h-full overflow-auto'>
                        {users.map((user) => (
                            <UserCard user={user} key={user.id} />
                        ))}
                    </div>

                    {/* loading */}

                    {isLoading && <Loader />}

                    {/* Load more button */}
                    <div className='inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-white pt-8 pb-8 pointer-events-none sticky transition-opacity duration-300 opacity-100'>
                        <button
                            type='button'
                            onClick={() => setPage((state) => state + 1)}
                            disabled={isLoading || page == maxPage}
                            className='relative bg-teal-600 hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 text-sm text-white font-semibold h-12 px-6 rounded-lg flex items-center dark:bg-slate-700 dark:hover:bg-slate-600 transition-transform pointer-events-auto disabled:bg-teal-50 disabled:text-slate-500 disabled:border-slate-200'>
                            Load more
                        </button>
                    </div>
                </section>
            </main>
        </>
    );
}
