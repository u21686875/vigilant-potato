import React from 'react';

const ModuleCard = ({ moduleCode }) => (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{moduleCode}</h5>
        </div>
      </div>
    </div>
  );
  

export default ModuleCard;
