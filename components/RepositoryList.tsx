import { getRepositoryList } from "@/api/github";
import Image from "next/image";
// import { useState } from "react";

export async function RepositoryList({ githubId }: { githubId: string }) {
    // const [repoPage, setRepoPage] = useState<number>(0);
    const repositoryList = await getRepositoryList(githubId, 0);

    if (repositoryList.status !== 200) {
        return <div>Error</div>
    }

    return (
        <section>
            {
                repositoryList.data.map((repo, index) => {
                    return (
                        <div className='w-max flex flex-row items-center justify-between' key={index + 10}>
                            <Image className='rounded-full' width={64} height={64} src={repo.owner.avatar_url} alt='repo_image'></Image>
                            <div className='w-24 ml-4'>{repo.owner.login}</div>
                            <div className='ml-1'>{repo.name}</div>
                        </div>
                    )
                })
            }
        </section>
    )
}