import React from 'react'
import { StarIcon } from '@heroicons/react/solid'

const GET_IMG = "https://image.tmdb.org/t/p/w1280";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Movie(props) {
    console.log("Single Movie", props.singleMovieItem)

    return (
        <div className="bg-gray-50">
            <main>
                <div className="bg-white">
                    <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:pt-24 sm:pb-32 sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
                        {/* Product details */}
                        <div className="lg:max-w-full lg:self-end lg:col-start-1 lg:col-span-2">
                            <div className="mt-4">
                                <p className="text-7xl  font-light tracking-tight text-gray-900 ">{props.singleMovieItem.original_title}</p>
                            </div>

                            <section aria-labelledby="information-heading" className="mt-4">
                                <h2 id="information-heading" className="sr-only">
                                    Product information
                                </h2>

                                <div className="flex items-center">
                                    <div className="flex items-center">
                                        {props.singleMovieItem.genres.map((gener) => (
                                            <p key={gener.id} className="ml-2 text-sm text-red-500">{gener.name}</p>
                                        ))}
                                    </div>

                                    <div className="ml-4 pl-4 border-l border-gray-300 flex items-center">

                                        <div className="flex items-center">
                                            <div>
                                                <div className="flex items-center">
                                                    {[0, 1, 2, 3, 4].map((rating) => (
                                                        <StarIcon
                                                            key={rating}
                                                            className={classNames(
                                                                (props.singleMovieItem.vote_average / 2) > rating ? 'text-yellow-400' : 'text-gray-300',
                                                                'h-5 w-5 flex-shrink-0'
                                                            )}
                                                            aria-hidden="true"
                                                        />
                                                    ))}
                                                </div>

                                            </div>
                                            <p className="ml-2 text-sm text-gray-500">{props.singleMovieItem.vote_count} reviews</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 space-y-6">
                                    <p className="text-base text-gray-500">{props.singleMovieItem.overview}</p>
                                </div>
                            </section>
                        </div>

                        {/* Product image */}
                        <div className="mt-10 lg:mt-0 lg:col-start-3 lg:row-span-3 lg:self-center border-2 p-7">
                            <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
                                <img
                                    src={GET_IMG + props.singleMovieItem.poster_path}
                                    className="w-full h-full object-center object-cover"
                                />
                                <p className="ml-2 mt-7 text-lg text-gray-700">
                                    Release Date :
                                    <span className="ml-2 text-base text-gray-500">
                                        {props.singleMovieItem.release_date}
                                    </span>
                                </p>
                                <p className="ml-2 mt-4 text-lg text-gray-700">
                                    Popularity :
                                    <span className="ml-2 text-base text-gray-500">
                                        {props.singleMovieItem.popularity}
                                    </span>
                                </p>
                                <p className="ml-2 mt-4 text-lg text-gray-700">
                                    Language :
                                    <span className="ml-2 text-base text-gray-500">
                                        {props.singleMovieItem.original_language.toUpperCase()}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

