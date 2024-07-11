import Image from 'next/image';
import { User } from '../types';

type Props = {
    user: User;
};

export default function UserCard({ user }: Props) {
    return (
        <figure className='relative flex flex-col-reverse bg-sky-50 rounded-lg p-6'>
            <figcaption className='flex items-center space-x-4'>
                <Image
                    src={user.avatar}
                    alt=''
                    className='flex-none rounded-full object-cover'
                    loading='lazy'
                    decoding='async'
                    width={56}
                    height={56}
                    style={{ minHeight: 56 }}
                />
                <div className='flex-auto'>
                    <div className='text-base text-slate-900 font-semibold dark:text-slate-300'>
                        <span className='absolute inset-0'></span>
                        <p>
                            {user.id} - {user.first_name} {user.last_name}
                        </p>
                    </div>
                    <div className='mt-0.5'>{user.email}</div>
                </div>
            </figcaption>
        </figure>
    );
}
