let app = new Vue({
    el: '#app',

    data() {
        return {
            saTotal: 37003,         //收案总数
            jaTotal: 31363,         //结案总数
            sjaList: [],            //2018、2019收结案数据对比
            picData2: {             //涉外涉港澳台、涉自贸区案件数及占比
                gatNum:7444,
                zmqNum:15392
            },
            picData3:{              //适用香港法、域外法案件情况
                xgfNum: 45,
                gjgyNum: 4,
                amfNum: 2,
                mjlgfNum: 1,
                mggfNum: 1,
            },
            picData4: {             //涉外涉港澳台案件分布情况
                xg: 5347,
                am: 90,
                tw: 758,
                mg: 190,
                jnd: 89,
                hg: 70,
                mlxy: 59,
                xjp: 55,
                adly: 46,
                rb: 45,
                yg: 27,
                ydnxy: 26,
                dg: 26,
                els: 11,
                fg: 24,
                hn: 23,
            },
            picData5: {
                ydylgjsstjzx: 690,
                mch:270,
                ls:601,
                wjtjy:12,
                gatjtjy:435,
            },
            picData6: {
                htjf: 5231,
                zscqjf: 3077,
                ldzy: 969,
                mjjdjf: 501,
                rzzlhtjf: 415,
                blhtjf: 326,
            },
            yearArrList: {
                sYear: 2019,
                eYear: 2020
            }
        }
    },

    mounted() {
        // window.localStorage.removeItem('dzlBigData');
        if (window.localStorage.getItem('dzlBigData')) {
            let params = JSON.parse(window.localStorage.getItem('dzlBigData'));

            //收结案总数
            this.saTotal = params.saTotal;
            this.jaTotal = params.jaTotal;

            //收结案数据对比
            this.sjaList = [];
            this.yearArrList = params.yearArrList;
            for (let i = 0; i < params.monthList.length - 2; i++) {
                let data = {
                    month: params.monthList[i + 1],
                    saDownYear: params.saDownYearList[i + 1]*(-1),
                    jaDownYear: params.jaDownYearList[i + 1]*(-1),
                    saUpYear: params.saUpYearList[i + 1],
                    jaUpYear: params.saUpYearList[i + 1]
                };
                this.sjaList.push(data);
            }

            //涉外涉港澳台、涉自贸区案件数及占比
            this.picData2 = {
                gatNum: params.picData2[0],
                zmqNum: params.picData2[1]
            };

            //适用香港法、域外法案件情况
            this.picData3 = {
                xgfNum: params.picData3[0],
                gjgyNum: params.picData3[1],
                amfNum: params.picData3[2],
                mjlgfNum: params.picData3[3],
                mggfNum: params.picData3[4]
            };

            //涉外涉港澳台案件分布情况
            this.picData4 = {
                xg: params.picData4[0],
                am: params.picData4[1],
                tw: params.picData4[2],
                mg: params.picData4[3],
                jnd: params.picData4[4],
                hg: params.picData4[5],
                mlxy: params.picData4[6],
                xjp: params.picData4[7],
                adly: params.picData4[8],
                rb: params.picData4[9],
                yg: params.picData4[10],
                ydnxy: params.picData4[11],
                dg: params.picData4[12],
                els: params.picData4[13],
                fg: params.picData4[14],
                hn: params.picData4[15]
            };

            //多元化纠纷解决机制数据
            this.picData5 = {
                ydylgjsstjzx: params.picData5[1],
                mch: params.picData5[2],
                ls: params.picData5[3],
                wjtjy: params.picData5[4],
                gatjtjy: params.picData5[5]
            };

            //自贸区案件类型及数据
            this.picData6 = {
                htjf: params.picData6[0],
                zscqjf: params.picData6[1],
                ldzy: params.picData6[2],
                mjjdjf: params.picData6[3],
                rzzlhtjf: params.picData6[4],
                blhtjf: params.picData6[5]
            };
        } else {
            this.getDefaultData();
        }
    },

    methods: {
        getDefaultData() {
            this.sjaList = [
                {month:'1月',saDownYear: 652, jaDownYear: 390, saUpYear: 1823, jaUpYear: 508},
                {month:'2月',saDownYear: 422, jaDownYear: 357, saUpYear: 846, jaUpYear: 668},
                {month:'3月',saDownYear: 661, jaDownYear: 513, saUpYear: 1196, jaUpYear: 854},
                {month:'4月',saDownYear: 858, jaDownYear: 436, saUpYear: 1215, jaUpYear: 968},
                {month:'5月',saDownYear: 1074, jaDownYear: 774, saUpYear: 743, jaUpYear: 968},
                {month:'6月',saDownYear: 714, jaDownYear: 708, saUpYear: 782, jaUpYear: 1217},
                {month:'7月',saDownYear: 1136, jaDownYear: 725, saUpYear: 1991, jaUpYear: 1039},
                {month:'8月',saDownYear: 1074, jaDownYear: 807, saUpYear: 1209, jaUpYear: 1094},
                {month:'9月',saDownYear: 857, jaDownYear: 969, saUpYear: 1375, jaUpYear: 1326}
            ];
        },

        save() {
            let params = {};

            //收结案总数
            params.saTotal = this.saTotal;
            params.jaTotal = this.jaTotal;

            //收结案数据对比
            params.yearArrList = this.yearArrList;
            params.monthList = [''];
            params.saDownYearList = [0];
            params.jaDownYearList = [0];
            params.saUpYearList = [0];
            params.jaUpYearList = [0];
            this.sjaList.forEach(item => {
                params.monthList.push(item.month);
                params.saDownYearList.push(Number(item.saDownYear)*(-1));
                params.jaDownYearList.push(Number(item.jaDownYear)*(-1));
                params.saUpYearList.push(Number(item.saUpYear));
                params.jaUpYearList.push(Number(item.jaUpYear));
            });
            params.monthList.push('');
            params.saDownYearList.push(0);
            params.jaDownYearList.push(0);
            params.saUpYearList.push(0);
            params.jaUpYearList.push(0);

            //涉外涉港澳台、涉自贸区案件数及占比
            params.picData2 = [];
            for (let i in this.picData2) {
                params.picData2.push(Number(this.picData2[i]));
            }

            //适用香港法、域外法案件情况
            params.picData3 = [];
            for (let i in this.picData3) {
                params.picData3.push(Number(this.picData3[i]));
            }

            //涉外涉港澳台案件分布情况
            params.picData4 = [];
            for (let i in this.picData4) {
                params.picData4.push(Number(this.picData4[i]));
            }

            //多元化纠纷解决机制数据
            params.picData5 = [0];
            for (let i in this.picData5) {
                params.picData5.push(Number(this.picData5[i]));
            }
            params.picData5.push(0);

            //自贸区案件类型及数据
            params.picData6 = [];
            for (let i in this.picData6) {
                params.picData6.push(Number(this.picData6[i]));
            }
            window.localStorage.setItem('dzlBigData', JSON.stringify(params));
            // window.location.href = './index.html';
        },

        cancel() {
            // window.location.href = './index.html';
            window.location.reload();
        },

        //添加收结案数据对比项
        addSjaItem(item, index) {
            let mm = parseInt(item.month);
            if (mm && mm < 12) {
                mm++;
            } else {
                return
            }
            let data = {month: mm + '月',saDownYear: 0, jaDownYear: 0, saUpYear: 0, jaUpYear: 0};
            this.sjaList.splice(index + 1, 0, data);
        },

        //删除收结案数据对比项
        delSjaItem(item, index) {
            this.sjaList.splice(index, 1);
        }
    }

})