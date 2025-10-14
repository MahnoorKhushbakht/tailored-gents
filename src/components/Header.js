'use client'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    ChakraProvider,
  } from '@chakra-ui/react'
  import SignOutButton from './SignOutButton';
  import { getUserFromSession } from '@/lib/auth';
export default async function Header() {
    const user = await getUserFromSession();
    return(
<ChakraProvider>
<Breadcrumb spacing='8px' className="flex gap-3 bg-gray-800 p-2 text-base" separator={<ChevronRightIcon color='gray.500' />}>
  <BreadcrumbItem>
    <BreadcrumbLink href='/'> Tailored Gents</BreadcrumbLink>
  </BreadcrumbItem>

  <BreadcrumbItem className="ml-auto">
    <BreadcrumbLink href="/about" prefetch={false}>About</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbItem className="ml-auto">
    <BreadcrumbLink href="/category" prefetch={false}>Categories</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbItem isCurrentPage>
    <BreadcrumbLink  href="/contact" prefetch={false}>Contact</BreadcrumbLink>
  </BreadcrumbItem>
  {user ? (
  <BreadcrumbItem >
    <BreadcrumbLink>
    {user.email}
            <SignOutButton/>
    </BreadcrumbLink>
  </BreadcrumbItem>
      ) : (
        <BreadcrumbLink href="/sign-in">
        Sign in
        </BreadcrumbLink>
         )}
</Breadcrumb>
</ChakraProvider>
    )
}