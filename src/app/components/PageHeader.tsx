type Props = {
    title: string;
    description: string;
};

export default function PageHeader({ title, description }: Props) {
    return (
        <div className='z-10 max-w-5xl w-full justify-center items-center font-mono text-sm lg:flex mb-10 text-center'>
            <header>
                <h1 className='text-slate-900 text-4xl tracking-tight font-extrabold sm:text-5xl dark:text-white mb-1'>
                    {title}
                </h1>
                <p>{description}</p>
            </header>
        </div>
    );
}
