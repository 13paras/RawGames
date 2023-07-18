/* eslint-disable react/prop-types */
const Stats = ({ data }) => {
  return (
    <div className='stats stats-vertical my-4 bg-base-200 shadow lg:stats-horizontal'>
      <div className='stat place-items-center'>
        <div className='stat-title'>Rating</div>
        <div className='stat-value'>
          {data?.rating}/{data?.rating_top}
        </div>
        <div className='stat-desc'>From January 1st to February 1st</div>
      </div>

      <div className='stat place-items-center'>
        <div className='stat-title flex items-center capitalize'>
          {data?.ratings[0]?.title}
          {/* <img className="bg-black w-16 rounded-full" src={emoji} alt="" />{" "} */}
        </div>
        <div className='stat-value text-secondary'>
          {data?.ratings[0]?.count} ratings
        </div>
        <div className='stat-desc text-secondary'>
          {" "}
          {data?.ratings[0]?.percent}%{" "}
        </div>
      </div>

      <div className='stat place-items-center'>
        <div className='stat-title'>Achievements Count</div>
        <div className='stat-value'>{data?.achievements_count}</div>
        <div className='stat-desc'>↘︎ 90 (14%)</div>
      </div>
    </div>
  );
};

export default Stats;
