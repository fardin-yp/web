import React,{useEffect, useState} from 'react';
import {Line} from 'react-chartjs-2';


const chart = ({info}) => {

    const date_ob = new Date();
    const [data ,setData] = useState({});
    const  monthNamesShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let year = JSON.stringify(date_ob.getFullYear())
    const filterYear = info && info.filter(res => res.year === year);
    const jan = filterYear && filterYear.filter(res => res.month === "Jan").length
    const Feb = filterYear && filterYear.filter(res => res.month === "Feb").length
    const Mar = filterYear && filterYear.filter(res => res.month === "Mar").length
    const Apr = filterYear && filterYear.filter(res => res.month === "Apr").length
    const May = filterYear && filterYear.filter(res => res.month === "May").length
    const Jun = filterYear && filterYear.filter(res => res.month === "Jun").length
    const Jul = filterYear && filterYear.filter(res => res.month === "Jul").length
    const Aug = filterYear && filterYear.filter(res => res.month === "Aug").length
    const Sep = filterYear && filterYear.filter(res => res.month === "Sep").length
    const Oct = filterYear && filterYear.filter(res => res.month === "Oct").length
    const Nov = filterYear && filterYear.filter(res => res.month === "Nov").length
    const Dec = filterYear && filterYear.filter(res => res.month === "Dec").length

    const getChart =() => {
        setData({
            labels: monthNamesShort,
            datasets: [
              {
                label: 'تعداد بازدید ها (ماهیانه)',
                data: [jan , Feb, Mar, Apr, May, Jun,Jul,Aug,Sep,Oct,Nov,Dec],
                backgroundColor: [
                    "RGBA(255,87,34,1)",
                ],
                lineTension: 0.4,  
                fill: true,
                pointRadius:0
              },
            ],
          })
    }
    useEffect(() => {
        getChart()
    },[])

    return (
        <div className="chart">
            <div className="line-chart">
           {jan && data.labels && <Line 
            data={data} 
            options={{responsive:true}}

            />}
            </div>
        </div>

    )
}

export default chart
