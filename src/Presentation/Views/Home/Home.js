import React from 'react';
import Visits from './contents/Visits';
import Title from '../../components/Title/Title';
import SalesStatistics from './contents/SalesStatistics';
import NotificationHome from './contents/NotificationHome';
import GeneralDescriptions from './contents/GeneralDescriptions';

export default function Home() {
  return (
    <div className="content-wrapper">
      <div className="content-header">
        <Title
          title='TABLERO'
          component='HOME '
          position=''
          path='/'
        />
      </div>
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            {/* COLUMS THE VISITS ON LINE AND PRODUCT WITH MORE SALES */}
            <div className="col-lg-6">
              <div className="card">
                {/* VISITS ON LINE */}
                <Visits />
              </div>

              <div className="card">
                {/* NOTIFICATION LIST */}
                <NotificationHome />
              </div>
            </div>

            {/* COLUM THE SALES AND GENERAL DESCRIPTIONS */}
            <div className="col-lg-6">
              <div className="card">
                {/* CARD SALES */}
                <SalesStatistics />
              </div>

              <div className="card">
                {/* CARD GENERAL DESCCRIPTIONS STORE ON LINE */}
                <GeneralDescriptions />
              </div>  
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}