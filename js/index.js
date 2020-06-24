let app = new Vue({
    el: '#app',

    data: function() {
        return {
            changeLogo: false,
            logoInterVal: null,
            time1: '',      //年月日
            time2: '',      //星期
            time3: '',      //小时分
            params: {},
            amqList: []
        }
    },

    mounted: function() {
        this.initData();
        let that = this;
        //切换logo
        // this.switchLogo();
        //获取时间
        setInterval(function() {
            that.getTime();
        }, 1000);
        //初始化收结案数据对比
        this.initClosingCaseView();
        //初始化涉外涉港澳台、涉自贸区案件数及占比
        this.initSwgatCaseView();
        //初始化域外法适用案件
        this.initYwfsyCaseView();
        //初始化涉外涉港澳台案件分布情况
        this.initSsCaseView();
        //初始化多元化纠纷解决数据
        this.initDyhjfCaseView();
    },

    methods: {
        //初始化数据
        initData() {
            if (window.localStorage.getItem('dzlBigData')) {
                this.params = JSON.parse(window.localStorage.getItem('dzlBigData'));
            } else {
                this.params = {
                    yearArrList: {
                        sYear: 2019,
                        eYear: 2020
                    },
                    saTotal: 37003,
                    jaTotal: 31363,
                    monthList: ['','1月','2月','3月','4月','5月','6月','7月','8月','9月',''],
                    saDownYearList: [0,-652,-422,-661,-858,-1074,-714,-1136,-1074,-857,0],
                    jaDownYearList: [0,-390,-357,-513,-436,-774,-708,-725,-807,-969,0],
                    saUpYearList: [0,1823,846,1196,1215,743,782,1991,1209,1375,0],
                    jaUpYearList: [0,508,668,854,968,968,1217,1039,1094,1326,0],
                    picData2: [7444,15392],
                    picData3: [45,4,2,1,1],
                    picData4: [5347,90,758,190,89,70,59,55,46,45,27,26,26,11,24,23], //[800,90,400,190,89,70,59,55,46,45,27,26,26,11,24,23], //picData4: [6347,1090,1758,1190,1089,1070,1059,1055,1046,1045,1027,1026,1026,1011,1024,1023],
                    picData5: [0,690,270,601,12,435,0],
                    picData6: [5231,3272,969,501,415,326]
                }
            }
            let data1 = {txt: '合同纠纷', num: this.params.picData6[0]},
                data2 = {txt: '知识产权纠纷', num: this.params.picData6[1]},
                data3 = {txt: '劳动争议', num: this.params.picData6[2]},
                data4 = {txt: '民间借贷纠纷', num: this.params.picData6[3]},
                data5 = {txt: '融资租赁合同纠纷', num: this.params.picData6[4]},
                data6 = {txt: '保理合同纠纷', num: this.params.picData6[5]};
            let arr = [data5,data6,data1,data4,data2,data3];
            this.getSortAmqList(arr);
        },

        //排序
        getSortAmqList(arr) {
            let index = 0;
            for (let i = 0; i < arr.length - 1; i++) {
                if (arr[index].num < arr[i + 1].num) {
                    index = i + 1;
                }
            }
            this.amqList.push(arr[index]);
            arr.splice(index, 1);
            if (arr.length > 1) {
                this.getSortAmqList(arr);
            } else {
                this.amqList.push(arr[0]);
            }
        },

        //初始化多元化纠纷解决数据
        initDyhjfCaseView: function() {
           let dyhjfCaseView = echarts.init(document.getElementById('dyhjfCaseView'));

           let option = {
               title: {
                   text: '多元化纠纷解决数据',
                   textStyle: {
                       color: 'white',
                       fontSize: '24',
                   },
                   top: '3',
                   left: '55'
               },
               grid: [
                   {
                       left: '28',
                       right: '78',
                       bottom: '79',
                       top: '124',
                       containLabel: false
                   }
               ],
               xAxis: [
                   {
                       type: 'category',
                       boundaryGap: false,
                       data: ['','一带一路国际\n商事调解中心','贸促会','律师','外籍调解员','港澳台籍\n调解员',''],
                       axisTick: {show: false},
                       axisLabel: {
                           color: '#fff',
                           margin: 30,
                           interval:0,
                           lineHeight: 20,
                           rich: {
                               a: {
                                   lineHeight: 20
                               }
                           }
                       },
                       splitLine: {
                           show: false
                       },
                       axisLine: {
                           lineStyle:{
                               color: '#a6b7d3',
                           }
                       }
                   }
               ],
               yAxis: [
                   {
                       type: 'value',
                       show: true,
                       axisLabel: {
                           show: false
                       },
                       axisTick: {
                           show: false
                       },
                       splitLine: {
                           lineStyle: {
                               color:'#4966aa'
                           }
                       },
                       axisLine: {
                           show:false
                       }
                   }
               ],
               series: [
                   {
                       name: 'data',
                       type:'line',
                       data: this.params.picData5,
                       areaStyle: {
                           normal: {
                               color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                   offset: 0,
                                   color: '#00a1f0'
                               }, {
                                   offset: 1,
                                   color: 'rgba(255,255,255,0)'
                               }])
                           }
                       },
                       lineStyle: {
                           normal: {
                               opacity: 0,
                           }
                       },
                       symbol: 'circle',
                       symbolSize:function(rawValue, params) {
                           if (params.dataIndex == 0 || params.dataIndex == 6) {
                               return 0.01
                           } else {
                               return 14
                           }
                       },
                       label: {
                           normal: {
                               show: true,
                               position: 'top',
                               fontSize: '10',
                               color: 'white',
                               formatter: function (params) {
                                   if (params.dataIndex == '0' || params.dataIndex == '6') {
                                       return ''
                                   } else {
                                       return params.value
                                   }
                               }
                           }
                       },
                       itemStyle: {
                           normal: {
                               color: '#00fed8'
                           }
                       }
                   },
               ]
           };

           dyhjfCaseView.setOption(option);
       },

        //初始化涉外涉港澳台案件分布情况
        initSsCaseView: function() {
            let ssCaseView = echarts.init(document.getElementById('ssCaseView'));
            let num1 = this.params.picData4[0] - 900,
                num2 = this.params.picData4[2] - 500;

            this.params.picData4.forEach((item,index) => {
                if (index == 0) {
                    this.params.picData4[index] = 900;
                } else if (index == 2) {
                    this.params.picData4[index] = 500;
                } else {
                    this.params.picData4[index] = item + 100;
                }
            })


            let option = {
                title: {
                    text: '涉外涉港澳台案件分布情况',
                    textStyle: {
                        color: 'white',
                        fontSize: '24',
                    },
                    left: '322',
                    top: '8'
                },
                grid: [
                    {
                        left: '24',
                        right: '32',
                        // bottom: '50',
                        // top: '98',
                        bottom: '40',
                        top: '38',
                    }
                ],
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: true,
                        data: ["中国香港","中国澳门","中国台湾","美国","加拿大","韩国","马来西亚","新加坡","澳大利亚","日本","英国","印度尼西亚","德国","俄罗斯","法国","荷兰"],
                        axisTick: {show: false},
                        axisLabel: {
                            color: '#fff',
                            margin: 17,
                            interval:0
                        },
                        axisLine: {
                            show: false
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        show: false,
                    }
                ],
                series: [
                    {
                        name: '案件数',
                        type:'bar',
                        //5347	90	758	190	89	70	59	55	46	45	27	26	26	11	24	23  由于数据跨度过大 添加1000基数
                        data: this.params.picData4,
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                fontSize: '14',
                                color: 'white',
                                formatter: function (params) {
                                    if (params.dataIndex == 0) {
                                        return params.value + num1
                                    } else if (params.dataIndex == 2) {
                                        return params.value + num2
                                    } else {
                                        return params.value - 100
                                    }
                                }
                            }
                        },
                        itemStyle: {
                            normal: {   //径向0, 1, 0, 0  横向1, 0, 0, 0
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: "#a8e7b0" // 0% 处的颜色
                                },{
                                    offset: 1,
                                    color: "#00a9e5" // 100% 处的颜色
                                }], false)
                            }
                        },
                        barWidth: 26
                    },
                ]
            };

            ssCaseView.setOption(option);
        },

        //初始化域外法适用案件
        initYwfsyCaseView: function() {
            let ywfsyCaseView = echarts.init(document.getElementById('ywfsyCaseView'));
            let a = '适用中国香港法：' + this.params.picData3[0],
                b = '适用国际公约：' + this.params.picData3[1],
                c = '适用中国澳门法：' + this.params.picData3[2],
                d = '适用孟加拉国法：' + this.params.picData3[3],
                e = '适用蒙古国法：' + this.params.picData3[4];

            let option = {
                title: {
                    text: '适用域外法案件',
                    textStyle: {
                        color: 'white',
                        fontSize: '24',
                    },
                    left: '35',
                    top:'4'
                },
                //picData3: [45,4,2,1,1],
                legend: [
                    {
                        data: [a,b,c,d,e],
                        top:'70',
                        left: '263',
                        icon: 'rect',
                        itemWidth: 15,
                        itemHeight: 15,
                        itemGap: 25,
                        orient: 'vertical',
                        textStyle: {
                            color: 'white',
                            fontSize: 16,
                        }
                    },
                ],
                series: [
                    {
                        name:'来源',
                        type:'pie',
                        roseType : 'area',
                        startAngle: 221,
                        center: [152,152],
                        radius: [30, 118],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show:false
                            }
                        },
                        data:[
                            {
                                value:45,
                                name:a,
                                itemStyle: {
                                    color: {
                                        type: 'radial',
                                        x: 152,
                                        y: 152,
                                        r: 118,
                                        colorStops: [{
                                            offset: 0.25, color: '#efebe8' // 0% 处的颜色
                                        },{
                                            offset: 0.6, color: '#bcbabb' // 100% 处的颜色
                                        },{
                                            offset: 1, color: '#fff' // 100% 处的颜色
                                        }],
                                        global: true // 缺省为 false
                                    }
                                }
                            },
                            {
                                value:30,
                                name:c,
                                itemStyle: {
                                    color: {
                                        type: 'radial',
                                        x: 152,
                                        y: 152,
                                        r: 90,
                                        colorStops: [{
                                            offset: 0.25, color: '#02979e' // 0% 处的颜色
                                        },{
                                            offset: 0.6, color: '#02d8e0' // 100% 处的颜色
                                        },{
                                            offset: 1, color: '#9df7f8' // 100% 处的颜色
                                        }],
                                        global: true // 缺省为 false
                                    }
                                }
                            },
                            {
                                value:20,
                                name:d,
                                itemStyle: {
                                    color: {
                                        type: 'radial',
                                        x: 152,
                                        y: 152,
                                        r: 71,
                                        colorStops: [{
                                            offset: 0.25, color: '#dbdccc' // 0% 处的颜色
                                        },{
                                            offset: 0.6, color: '#afbc9e' // 100% 处的颜色
                                        },{
                                            offset: 1, color: '#848b84' // 100% 处的颜色
                                        }],
                                        global: true // 缺省为 false
                                    }
                                }
                            },
                            {
                                value:35,
                                name:b,
                                itemStyle: {
                                    color: {
                                        type: 'radial',
                                        x: 152,
                                        y: 152,
                                        r: 100,
                                        colorStops: [{
                                            offset: 0.25, color: '#91d4fe' // 0% 处的颜色
                                        },{
                                            offset: 0.6, color: '#3db0ff' // 100% 处的颜色
                                        },{
                                            offset: 1, color: '#287cab' // 100% 处的颜色
                                        }],
                                        global: true // 缺省为 false
                                    }
                                }
                            },
                            {
                                value:20,
                                name:e,
                                itemStyle: {
                                    color: {
                                        type: 'radial',
                                        x: 152,
                                        y: 152,
                                        r: 71,
                                        colorStops: [{
                                            offset: 0.25, color: '#7F4FC0' // 0% 处的颜色
                                        },{
                                            offset: 0.6, color: '#8665C0' // 100% 处的颜色
                                        },{
                                            offset: 1, color: '#D188FC' // 100% 处的颜色
                                        }],
                                        global: true // 缺省为 false
                                    }
                                }
                            }
                        ]
                    },
                    {
                        name:'来源1',
                        type:'pie',
                        startAngle: 221,
                        center: [152,152],
                        radius: [20, 21],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show:false
                            }
                        },
                        data:[
                            {
                                value:100,
                                name:'innerLine',
                                itemStyle: {
                                    color: 'white'
                                }
                            }
                        ]
                    }
                ]
            };

            ywfsyCaseView.setOption(option);
        },

        //初始化涉外涉港澳台、涉自贸区案件数及占比
        initSwgatCaseView: function() {
            let swgatCaseView = echarts.init(document.getElementById('swgatCaseView'));

            //picData2: [7444,15392],
            let a = '涉外涉港澳台：' + this.params.picData2[0],
                b = '涉自贸区：' + this.params.picData2[1],
                aPerset = Math.round(this.params.picData2[0]/(this.params.picData2[0] + this.params.picData2[1])*100),
                bPerset = 100 - aPerset;

            let option = {
                title: {
                    text: '涉外涉港澳台、涉自贸区诉讼案件数及占比',
                    textStyle: {
                        color: 'white',
                        fontSize: '24',
                    },
                    left: '35',
                    top:'4'
                },
                legend: [
                    {
                        data: [a, b],
                        top:'206',
                        left: '275',
                        icon: 'rect',
                        itemWidth: 15,
                        itemHeight: 15,
                        itemGap: 25,
                        orient: 'vertical',
                        textStyle: {
                            color: 'white',
                            fontSize: 16,
                        }
                    },
                ],
                grid: [
                    {
                        left: '42',
                        right: '6',
                        bottom: '109',
                        top: '86',
                        containLabel: true
                    }
                ],
                series: [
                    {
                        name:'访问来源',
                        type:'pie',
                        startAngle: 239,
                        center: [157,162],
                        radius: [67, 102],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                formatter: function(params) {
                                    return params.value + '%'
                                },
                                fontSize: '16',
                                color: '#fff'
                            }
                        },
                        labelLine: {
                            normal: {
                                show:false,
                                length: 5,
                                length2: 5
                            }
                        },
                        data:[
                            {
                                value:aPerset,
                                name: a,
                                itemStyle: {
                                    color: {
                                        type: 'radial',
                                        x: 1.6,
                                        y: 0.5,
                                        r: 2,
                                        colorStops: [{
                                            offset: 0.4, color: '#7F4FC0'
                                        },{
                                            offset: 0.65, color: '#8665C0'
                                        }, {
                                            offset: 0.9, color: '#CCBEFC'
                                        }],
                                        global: false // 缺省为 false
                                    }
                                }
                            },
                            {
                                value:bPerset,
                                name: b,
                                itemStyle: {
                                    color: {
                                        type: 'radial',
                                        x: 157,
                                        y: 162,
                                        r: 102,
                                        colorStops: [{
                                            offset: 0.64, color: '#1da9ba'
                                        },{
                                            offset: 0.82, color: '#3df1ff'
                                        },{
                                            offset: 1, color: '#bcfdf7'
                                        }],
                                        global: true // 缺省为 false
                                    }
                                }
                            }
                        ]
                    }
                ]
            };

            swgatCaseView.setOption(option);
        },

        //初始化收结案数据对比
        initClosingCaseView: function() {
            let closingCaseView = echarts.init(document.getElementById('closingCaseView'));
            let that = this;

            let option = {
                title: {
                    text: this.params.yearArrList.sYear + '、' + this.params.yearArrList.eYear + '收结案数据对比',
                    textStyle: {
                        color: 'white',
                        fontSize: '24',
                    },
                    left: '50'
                },
                legend: [
                    {
                        data: ['收案','结案'],
                        top:'50',
                        right: '8',
                        icon: 'circle',
                        itemWidth: 12,
                        textStyle: {
                            color: 'white'
                        }
                    },
                ],
                grid: [
                    {
                        left: '42',
                        right: '6',
                        bottom: '109',
                        top: '86',
                        containLabel: true
                    },
                    {
                        left: '42',
                        right: '6',
                        bottom: '12',
                        top: '200',
                        containLabel: true
                    }
                ],
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: this.params.monthList,
                        axisTick: {show: false},
                        axisLabel: {
                            color: '#fff',
                            margin: 5,
                            interval:0
                        },
                        splitLine: {
                            show: false
                        },
                        axisLine: {
                            lineStyle:{
                                color: '#7a82c1',
                            }
                        }
                    },
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: this.params.monthList,
                        axisTick: {show: false},
                        axisLabel: {
                            color: '#fff',
                            show:false
                        },
                        splitLine: {
                            show: false
                        },
                        axisLine: {
                            lineStyle:{
                                color: '#7a82c1',
                            }
                        },
                        gridIndex: 1
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        show: true,
                        name: this.params.yearArrList.eYear + '年',
                        nameLocation: 'center',
                        nameTextStyle: {
                            align: 'left',
                            lineHeight: 12,
                            fontSize: 12,
                            color: 'white',
                        },
                        nameGap: '13',
                        nameRotate: 270,
                        axisLabel: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show:false
                        },
                        axisLine: {
                            lineStyle:{
                                color: '#718eb8'
                            }
                        }
                    },
                    {
                        type: 'value',
                        show: true,
                        name: this.params.yearArrList.sYear + '年',
                        nameLocation: 'center',
                        nameTextStyle: {
                            align: 'left',
                            lineHeight: 12,
                            fontSize: 12,
                            color: 'white',
                        },
                        nameGap: '13',
                        nameRotate: 270,
                        axisLabel: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show:false
                        },
                        axisLine: {
                            lineStyle:{
                                color: '#718eb8'
                            }
                        },
                        gridIndex: 1
                    }
                ],
                series: [
                    {
                        name: '收案',
                        type:'line',
                        smooth: true,
                        data: this.params.saUpYearList,
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#fcbf02'
                                }, {
                                    offset: 1,
                                    color: 'rgba(255,255,255,0)'
                                }])
                            }
                        },
                        lineStyle: {
                            normal: {
                                opacity: 0
                            }
                        },
                        symbolSize: '0.01',
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                distance: 10,
                                fontSize: '10',
                                color: 'white',
                                formatter: function (params) {
                                    if (params.dataIndex == '0' || params.dataIndex == that.params.monthList.length - 1) {
                                        return ''
                                    } else {
                                        return params.value
                                    }
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#fcbf02'
                            }
                        }
                    },
                    {
                        name: '结案',
                        type:'line',
                        smooth: true,
                        data: this.params.jaUpYearList,
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#01de91'
                                }, {
                                    offset: 1,
                                    color: 'rgba(255,255,255,0)'
                                }])
                            }
                        },
                        lineStyle: {
                            normal: {
                                opacity: 0
                            }
                        },
                        symbolSize: '0.01',
                        label: {
                            normal: {
                                show: true,
                                position: 'bottom',
                                distance: 10,
                                fontSize: '10',
                                color: 'white',
                                formatter: function (params) {
                                    if (params.dataIndex == '0' || params.dataIndex == that.params.monthList.length - 1) {
                                        return ''
                                    } else {
                                        return params.value
                                    }
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#01de91'
                            }
                        }
                    },
                    {
                        name: '收案',
                        type:'line',
                        // gridIndex: 1,
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        smooth: true,
                        data: this.params.saDownYearList,
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(255,255,255,0)'
                                }, {
                                    offset: 1,
                                    color: '#fcbf02'
                                }])
                            }
                        },
                        lineStyle: {
                            normal: {
                                opacity: 0
                            }
                        },
                        symbolSize: '0.01',
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                distance: -20,
                                fontSize: '10',
                                color: 'white',
                                formatter: function (params) {
                                    if (params.dataIndex == '0' || params.dataIndex == that.params.monthList.length - 1) {
                                        return ''
                                    } else {
                                        return params.value * (-1)
                                    }
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#fcbf02'
                            }
                        }
                    },
                    {
                        name: '结案',
                        type:'line',
                        smooth: true,
                        // gridIndex: 1,
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        data: this.params.jaDownYearList,
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(255,255,255,0)'
                                }, {
                                    offset: 1,
                                    color: '#01de91'
                                }])
                            }
                        },
                        lineStyle: {
                            normal: {
                                opacity: 0
                            }
                        },
                        symbolSize: '0.01',
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                // distance: 15,
                                fontSize: '10',
                                color: 'white',
                                formatter: function (params) {
                                    if (params.dataIndex == '0' || params.dataIndex == that.params.monthList.length - 1) {
                                        return ''
                                    } else {
                                        return params.value * (-1)
                                    }
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#01de91'
                            }
                        }
                    }
                ]
            };

            closingCaseView.setOption(option);
        },

        //获取时间
        getTime: function() {
            let date = new Date();
            this.time1 = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';
            let dd = date.getDay();
            let hh = date.getHours(), mm = date.getMinutes(), ss = date.getSeconds();
            if (hh < 10) {
                hh = '0' + hh;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            if (ss < 10) {
                ss = '0' + ss;
            }
            if (dd == 0) {
                this.time2 = '星期日';
            } else if (dd == 1) {
                this.time2 = '星期一';
            } else if (dd == 2) {
                this.time2 = '星期二';
            } else if (dd == 3) {
                this.time2 = '星期三';
            } else if (dd == 4) {
                this.time2 = '星期四';
            } else if (dd == 5) {
                this.time2 = '星期五';
            } else if (dd == 6) {
                this.time2 = '星期六';
            }

            this.time3 = hh + ':' + mm + ':' + ss;
        },

        //切换logo
        switchLogo: function() {
            let that = this;
            if (this.logoInterVal) {
                clearInterval(this.logoInterVal);
            }
            this.logoInterVal = setInterval(function() {
                that.changeLogo = !that.changeLogo;
            }, 1000)
        }
    }
})


