import React from 'react';
import ModuleCard from './ModuleCard';

const AcademicRecord = ({ record }) => {
    const { name, surname, modules } = record;

    return (
        <div>
            <h1>{`${name}` `${surname}`}</h1>
            <div className="row">
                {modules.map((module, index) => (
                    <ModuleCard key={index} moduleCode={module.code} />
                ))}
            </div>
        </div>
    );
};


export default AcademicRecord;
