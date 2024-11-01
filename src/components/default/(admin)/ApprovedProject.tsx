import { listAllProjectDetails, updateProjectStatus } from '@/functions/projects';
import { Project } from '@/types/type';
import React, { useEffect, useState } from 'react'

const ApprovedProject = () => {
    const PROJECTS_PER_PAGE = 10;

    const [projects, setProjects] = useState<Project[]>([]);
    const [projectsEachPage, setProjectsEachPage] = useState<Project[]>([]);
    const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);

    const fetchData = async () => {
        const response = await listAllProjectDetails(100000000);
        if (response.ok) {
            const data = await response.json();
            setProjects(data);
        }
    };

    const handleProjectEachPage = () => {
        const lastIndex = currentPageNumber * PROJECTS_PER_PAGE;
        const firstIndex = lastIndex - PROJECTS_PER_PAGE;
        const projectsThisPage = projects.slice(firstIndex, lastIndex);
        setProjectsEachPage(projectsThisPage);
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        handleProjectEachPage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [projects, currentPageNumber]);

    const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);

    const handleStatusUpdate = async (id: number) => {
        const updatedProject = await updateProjectStatus(id, 2); // Update status to 2 (Approved)
        if (updatedProject) {
            // Update the project in the state
            setProjects(projects.map((project) =>
                project.project_id === id ? { ...project, status_id: 2 } : project
            ));
        }
    };

    console.log(projects)

    return (
        <div className='h-full'>
            <div className='flex justify-between items-center mb-8'>
                <h1 className=' text-2xl font-semibold '>All Project DashBoard <span className='text-gray-500'>{projects.filter(project => project.status_id===2).length} Total</span></h1>
                <div className='h-[1px] bg-gray-300' />
            </div>

            <div className='bg-white p-4 rounded shadow'>
                <table className="w-full">
                    <thead>
                        <tr className='text-left text-gray-500'>
                            <th className='py-2'>NAME AND ID</th>
                            <th className='py-2'>Project Name</th>
                            <th className='py-2 '>OPTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projectsEachPage.filter((project) => project.status_id === 2).map((project, index) => (
                            <tr key={index} className='border-b'>
                                <td className='py-4 flex items-center'>
                                    <div className='flex flex-col'>
                                        <div className='font-semibold'>{project.project_name}</div>
                                        <div className='text-gray-500'>#{project.project_id}</div>
                                    </div>
                                </td>
                                <td>{project.project_name}</td>
                                <td className='flex justify-between'>

                                    {
                                    }
                                    <button
                                        onClick={() => handleStatusUpdate(project.project_id)}
                                        className={`${project.status_id === 1 ? 'text-yellow-300' : ''} ${project.status_id === 2 ? 'cursor-not-allowed text-green-400' : ''}   ${project.status_id === 3 ? 'cursor-not-allowed text-red-400' : ''}`}
                                        disabled={project.status_id === 2 || project.status_id === 3}
                                    >
                                        <p className='text-black'>Status: </p>
                                        {project.status_id === 1 ? 'Approve' : ''} {project.status_id === 2 ? 'Approved' : ''} {project.status_id === 3 ? 'Sold out' : ''}
                                    </button>
                                    <button
                                        onClick={() => window.location.href = "/admin/updatecarboncredit/" + project.project_id}
                                        className={`text-green-500 `}

                                    >
                                        Update carboncredit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className='mt-6'>
                <ul className='flex justify-center'>
                    {[...Array(totalPages)].map((_, index) => (
                        <li key={index} className={`px-4 py-2 cursor-pointer ${index + 1 === currentPageNumber ? 'bg-blue-300' : ''}`} onClick={() => setCurrentPageNumber(index + 1)}>
                            {index + 1}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ApprovedProject