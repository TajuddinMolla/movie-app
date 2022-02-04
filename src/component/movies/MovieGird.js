import React from 'react';
import { StarIcon } from '@heroicons/react/solid'
import Spiner from '../ui/Spiner/Spiner';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

export default function MovieGird(props) {
    const GET_IMG = "https://image.tmdb.org/t/p/w1280";
    return (
        <section aria-labelledby="products-heading" className="max-w-7xl mx-auto overflow-hidden sm:px-6 lg:px-8">
            <h2 id="products-heading" className="sr-only">
                Products
            </h2>
            {
                props.movieItems.length > 0 ? <div className="-mx-px border-l border-gray-200 grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
                {props.movieItems.map((movieItem) => (
                    <div onClick={()=>props.modalController(movieItem.id)} key={movieItem.id} className="group relative p-4 border-r border-b border-gray-200 sm:p-6">
                        <div className="rounded-lg overflow-hidden bg-gray-200 aspect-w-1 aspect-h-1 group-hover:opacity-75">
                            <img
                                src={GET_IMG + movieItem.poster_path}
                                alt={movieItem.imageAlt}
                                className="w-full h-full object-center object-cover"
                            />
                        </div>
                        <div className="pt-10 pb-4 text-center">
                            <h3 className="text-sm font-medium text-gray-900">
                                
                                    <span aria-hidden="true" className="absolute inset-0" />
                                    {movieItem.title}
                            </h3>
                            <div className="mt-3 flex flex-col items-center">
                                <p className="sr-only">{movieItem.vote_average} out of 5 stars</p>
                                <div className="flex items-center">
                                    {[0, 1, 2, 3, 4].map((vote_average) => (
                                        <StarIcon
                                            key={vote_average}
                                            className={classNames(
                                                (movieItem.vote_average/2) > vote_average ? 'text-yellow-400' : 'text-gray-200',
                                                'flex-shrink-0 h-5 w-5'
                                            )}
                                            aria-hidden="true"
                                        />
                                    ))}
                                </div>
                                <p className="mt-1 text-sm text-gray-500">{movieItem.vote_count} reviews</p>
                            </div>
                            <p className="mt-4 text-base font-medium text-gray-900">{movieItem.release_date.slice(0, 4)}</p>
                        </div>
                    </div>
                ))}
            </div> 
            : <div className="text-center">
                <Spiner/>
            </div>
            }

            
        </section>
    );
}
