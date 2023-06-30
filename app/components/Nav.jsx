"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';


export const Nav = () => {
    const {data: session} = useSession();

    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);
    useEffect(()=>{
        (async () =>{
            const res = await getProviders();
            setProviders(res);
        })();
    }, []);
  return (
    <nav className='flex-between w-full mb-16 pt-3'>
        <Link href='/' className='flex gap-2 felx-center'>
            <Image src='/logobonako.svg' alt='logo' width={70} height={70}
            className='rounded-full'/>
            <p className="logo_text">Gallery</p>
        </Link>

        {/*Desktop Navegation*/}
        <div className="sm:flex hidden">
            {session?.user?(
                <div className="flex gap-3 md:gap-5">
                    <Link href='/create-prompt' className="black_btn">
                        Create Post
                    </Link>
                    <button type="button" onClick={signOut} className="outline_btn">
                        Sign Out
                    </button>
                    <Link href='/profile'>
                        <Image src={session?.user.image}
                        width={37}
                        height={37}
                        className="rounded-full"
                        alt="profile"/>
                    </Link>
                </div>
            ): (
                <>
                {providers &&
                Object.values(providers).map((provider) =>(
                    <button type="button" key={provider.name} onClick={()=>{
                        signIn(provider.id);
                    }}  className="black_btn">
                        Sign in
                    </button>
                ))}
                </>
            )} 
        </div>

    </nav>
  )
}
