/**
 * 
 * @param {number} year 
 * @param {1|2|3|4|5|6|7|8|9|10|11|12} month 
 * @param {1|2|3|4|5|6|7} dayOfWeek 
 */
function main(year, month, dayOfWeek){
    dayOfWeek--;
    var isLeapYear = isLeap(year);
    //var daysInMonth = getDaysInMonth(month, isLeapYear);
    var dayOfLastDayYearBefore = dayOfDec31YearBefore(year);
    var dayOfJan1 = dayOfDec31YearBefore + 1
    if(dayOfJan1 == 7)
        dayOfJan1 = 0;
    
    //Go from 1-12 and calc
    
    
    
}

function getDayOfWeekOfFirstOfMonth(firstOfYear, month, isLeap){
    month--;
    if(month >= 12){
        firstOfYear += 31
    }if(month >=11){
        firstOfYear +=30
    }if(month >=10){
        firstOfYear += 31
    }if(month>=9){
        firstOfYear += 30
    }if(month>=8){
        firstOfYear += 31
    }if(month>=7){
        firstOfYear += 31
    }if(month>=6){
        firstOfYear += 30
    }if(month>=5){
        firstOfYear += 31
    }if(month>=4){
        firstOfYear += 30
    }if(month>=3){
        firstOfYear +=31
    }if(month>=2){
        if(isLeap)
            firstOfYear += 29;
        else
            firstOfYear +=28
    }if(month>=1){
        firstOfYear +=31;
    }
    return Math.floor(firstOfYear % 7)
}

//Sunday is first day of week

function isLeap(year){
    return Boolean((!(year % 4) && (year % 100)) || !(year % 400))
}

function getDaysInMonth(month,isLeapYear){
    switch(month){
        case 4: case 6: case 9: case 11:
             return 30;
        case 1: case 3: case 5: case 7: case 8: case 10: case 12:
             return 31;
        case 2:
             return (isLeapYear) ? 29 : 28;
    }
}

function dayOfDec31YearBefore(year){
    return (Math.floor((year-1)*365 + ((year-1)/4) - ((year-1)/100) + ((year-1)/400)) % 7);
}





/** Months
 * 1 : Jan
 * 2 : Feb
 * 3 : Mar
 * 4 : Apr
 * 5 : May
 * 6 : June
 * 7 : July
 * 8 : Aug
 * 9 : Sep
 * 10 : Oct
 * 11 : Nov
 * 12 : Dec
 */

/** Days
 * 0 : Sun
 * 1 : Mon
 * 2 : Tue
 * 3 : Wed
 * 4 : Thu
 * 5 : Fri
 * 6 : Sat
 */
const Days={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6}

function doingItTheRightWay(year, dayOfWeek){
    for(let i=0,date=new Date(year,0,1,0,0,0,0),dates=[];i<12;i++,dates=[]){
        for(;date.getMonth()==i;date.setHours(24))if(date.getDay()==dayOfWeek)dates.push(new Date(date));
        (dates.length===5)?
            console.log("There is 5 instances!\n"+dates.reduce((total,cv)=>total+=cv.toLocaleDateString("en-US")+'\n','')):
            console.log("There is not 5 instances in "+date.toLocaleDateString('en-US',{month:'long'}));
    }
}