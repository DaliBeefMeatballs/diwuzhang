// 全局变量和图表实例
let charts = {};

// 数据定义
const productData = {
    labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    productA: [20, 28, 23, 16, 29, 36, 39, 33, 31, 19, 21, 25],
    productB: [17, 22, 39, 26, 35, 23, 25, 27, 29, 38, 28, 20]
};

const petsData = {
    countries: ['中国', '加拿大', '巴西', '澳大利亚', '日本', '墨西哥', '俄罗斯', '韩国', '瑞士', '土耳其', '英国', '美国'],
    cats: [19, 33, 28, 29, 14, 24, 57, 6, 26, 15, 27, 39],
    dogs: [25, 33, 58, 39, 15, 64, 29, 23, 22, 11, 27, 50]
};

const douyinData = {
    labels: ['一线城市', '二线城市', '三线城市', '四线及以外', '其他国家及地区'],
    growth: [51, 73, 99, 132, 45],
    distribution2017: [21, 35, 22, 19, 3],
    distribution2018: [13, 32, 27, 27, 1]
};

const climateData = {
    months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    temperature: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 33.4, 23.0, 16.5, 12.0, 6.2],
    precipitation: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
    evaporation: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
};

const carSalesData = {
    months: ['1月', '2月', '3月', '4月', '5月', '6月'],
    monthlySales: [2150, 1050, 1560, 1480, 1530, 1490],
    regions: ['北京', '上海', '广州', '深圳', '浙江', '山东'],
    regionalSales: [83775, 62860, 59176, 64205, 48671, 39968]
};



// 初始化所有图表
document.addEventListener('DOMContentLoaded', function() {
    // 添加加载延迟，确保DOM完全渲染
    setTimeout(() => {
        try {
            initProductSalesChart();
            initPetsChart();
            initDouyinChart();
            initClimateChart();
            initCarSalesChart();
            
            // 添加初始动画效果
            setTimeout(() => {
                animateChartsOnLoad();
            }, 500);
        } catch (error) {
            console.error('Error during initialization:', error);
        }
    }, 300);
});

// 产品销售额图表 - 主图表
function initProductSalesChart() {
    const ctx = document.getElementById('productSalesChart').getContext('2d');
    charts.product = new Chart(ctx, {
        type: 'line',
        data: {
            labels: productData.labels,
            datasets: [
                {
                    label: '产品A',
                    data: productData.productA,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.1)',
                    tension: 0.3,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    borderWidth: 3
                },
                {
                    label: '产品B',
                    data: productData.productB,
                    borderColor: 'rgb(54, 162, 235)',
                    backgroundColor: 'rgba(54, 162, 235, 0.1)',
                    tension: 0.3,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    borderWidth: 3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y + '亿元';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 45,
                    title: {
                        display: true,
                        text: '销售额(亿元)'
                    }
                }
            }
        }
    });
}







// 气候数据图表
function initClimateChart() {
    const ctx = document.getElementById('climateChart').getContext('2d');
    charts.climate = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: climateData.months,
            datasets: [
                {
                    label: '降水量',
                    data: climateData.precipitation,
                    backgroundColor: 'rgba(0, 128, 0, 0.5)',
                    borderColor: 'rgba(0, 128, 0, 1)',
                    borderWidth: 1,
                    stack: 'water'
                },
                {
                    label: '蒸发量',
                    data: climateData.evaporation,
                    backgroundColor: 'rgba(255, 165, 0, 0.5)',
                    borderColor: 'rgba(255, 165, 0, 1)',
                    borderWidth: 1,
                    stack: 'water'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y + 'ml';
                        }
                    }
                }
            },
            scales: {
                x: {
                    stacked: true
                },
                y: {
                    beginAtZero: true,
                    stacked: true,
                    title: {
                        display: true,
                        text: '水量 (ml)'
                    }
                }
            }
        }
    });

    // 添加气温线图
    const temperatureDataset = {
        label: '平均气温',
        data: climateData.temperature,
        type: 'line',
        borderColor: 'rgb(255, 0, 255)',
        backgroundColor: 'rgba(255, 0, 255, 0.1)',
        borderWidth: 3,
        pointRadius: 4,
        pointHoverRadius: 6,
        yAxisID: 'y1',
        tension: 0.3
    };
    
    charts.climate.data.datasets.push(temperatureDataset);
    charts.climate.options.scales.y1 = {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
            display: true,
            text: '气温(°C)'
        },
        grid: {
            drawOnChartArea: false
        }
    };
    charts.climate.update();
}



// 宠物图表 - 统一图表
function initPetsChart() {
    const ctx = document.getElementById('petsChart').getContext('2d');
    charts.pets = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: petsData.countries,
            datasets: [
                {
                    label: '养猫人群比例',
                    data: petsData.cats,
                    backgroundColor: 'rgba(255, 165, 0, 0.7)',
                    borderColor: 'rgba(255, 165, 0, 1)',
                    borderWidth: 1
                },
                {
                    label: '养狗人群比例',
                    data: petsData.dogs,
                    backgroundColor: 'rgba(32, 178, 170, 0.7)',
                    borderColor: 'rgba(32, 178, 170, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.x + '%';
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '人群比例(%)'
                    }
                }
            }
        }
    });
}

// 抖音图表 - 增长倍数图表
function initDouyinChart() {
    const ctx = document.getElementById('douyinChart').getContext('2d');
    charts.douyin = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: douyinData.labels,
            datasets: [{
                label: '增长倍数',
                data: douyinData.growth,
                backgroundColor: 'rgba(32, 178, 170, 0.7)',
                borderColor: 'rgba(32, 178, 170, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return '增长倍数: ' + context.parsed.y;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '增长倍数'
                    }
                }
            }
        }
    });
}

// 汽车销售图表 - 月度销售图表
function initCarSalesChart() {
    const ctx = document.getElementById('carSalesChart').getContext('2d');
    charts.car = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: carSalesData.months,
            datasets: [{
                label: '销售额(亿元)',
                data: carSalesData.monthlySales,
                backgroundColor: 'rgba(50, 153, 204, 0.7)',
                borderColor: 'rgba(50, 153, 204, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '销售额(亿元)'
                    }
                }
            }
        }
    });
}

// 产品图表交互函数
function toggleProductView(type) {
    // 更新按钮状态
    document.querySelectorAll('.chart-container:nth-child(1) .btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    if (type === 'pie') {
        charts.product.config.type = 'pie';
        charts.product.config.data = {
            labels: productData.labels,
            datasets: [
                {
                    label: '产品A',
                    data: productData.productA,
                    backgroundColor: 'rgba(255, 99, 132, 0.7)',
                    borderWidth: 2
                }
            ]
        };
    } else {
        charts.product.config.type = type;
        charts.product.config.data = {
            labels: productData.labels,
            datasets: [
                {
                    label: '产品A',
                    data: productData.productA,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: type === 'bar' ? 'rgba(255, 99, 132, 0.5)' : 'rgba(255, 99, 132, 0.1)',
                    tension: 0.3,
                    pointRadius: type === 'line' ? 4 : 0,
                    borderWidth: 3
                },
                {
                    label: '产品B',
                    data: productData.productB,
                    borderColor: 'rgb(54, 162, 235)',
                    backgroundColor: type === 'bar' ? 'rgba(54, 162, 235, 0.5)' : 'rgba(54, 162, 235, 0.1)',
                    tension: 0.3,
                    pointRadius: type === 'line' ? 4 : 0,
                    borderWidth: 3
                }
            ]
        };
    }
    charts.product.update();
}

function animateProductChart() {
    charts.product.data.datasets.forEach((dataset, i) => {
        const originalData = dataset.data;
        dataset.data = dataset.data.map(() => 0);
        charts.product.update();
        
        setTimeout(() => {
            dataset.data = originalData;
            charts.product.update();
        }, 100 + i * 100);
    });
}

// 宠物图表交互函数
function sortPetsData(type) {
    let indices;
    if (type === 'cats') {
        indices = petsData.cats
            .map((val, idx) => ({ val, idx }))
            .sort((a, b) => b.val - a.val)
            .map(item => item.idx);
    } else if (type === 'dogs') {
        indices = petsData.dogs
            .map((val, idx) => ({ val, idx }))
            .sort((a, b) => b.val - a.val)
            .map(item => item.idx);
    } else {
        indices = Array.from({ length: petsData.countries.length }, (_, i) => i);
    }

    charts.pets.data.labels = indices.map(i => petsData.countries[i]);
    charts.pets.data.datasets[0].data = indices.map(i => petsData.cats[i]);
    charts.pets.data.datasets[1].data = indices.map(i => petsData.dogs[i]);
    charts.pets.update();
}

function togglePetsView() {
    const currentType = charts.pets.config.type;
    charts.pets.config.type = currentType === 'bar' ? 'line' : 'bar';
    charts.pets.update();
}

// 抖音图表交互函数
function showDouyinData(type) {
    // 更新按钮状态
    document.querySelectorAll('.chart-container:nth-child(3) .btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    if (type === 'growth') {
        charts.douyin.config.type = 'bar';
        charts.douyin.data.datasets[0] = {
            label: '增长倍数',
            data: douyinData.growth,
            backgroundColor: 'rgba(32, 178, 170, 0.7)',
            borderColor: 'rgba(32, 178, 170, 1)',
            borderWidth: 1
        };
    } else if (type === '2017') {
        charts.douyin.config.type = 'pie';
        charts.douyin.data.datasets[0] = {
            label: '2017年分布',
            data: douyinData.distribution2017,
            backgroundColor: [
                'rgba(47, 79, 79, 0.7)',
                'rgba(255, 0, 0, 0.7)',
                'rgba(169, 169, 169, 0.7)',
                'rgba(255, 215, 0, 0.7)',
                'rgba(176, 196, 222, 0.7)'
            ]
        };
    } else if (type === '2018') {
        charts.douyin.config.type = 'pie';
        charts.douyin.data.datasets[0] = {
            label: '2018年分布',
            data: douyinData.distribution2018,
            backgroundColor: [
                'rgba(47, 79, 79, 0.7)',
                'rgba(255, 0, 0, 0.7)',
                'rgba(169, 169, 169, 0.7)',
                'rgba(255, 215, 0, 0.7)',
                'rgba(176, 196, 222, 0.7)'
            ]
        };
    }
    charts.douyin.update();
}

function compareDouyinData() {
    // 更新按钮状态
    document.querySelectorAll('.chart-container:nth-child(3) .btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    charts.douyin.config.type = 'bar';
    charts.douyin.data.datasets = [
        {
            label: '2017年分布',
            data: douyinData.distribution2017,
            backgroundColor: 'rgba(47, 79, 79, 0.7)',
            borderColor: 'rgba(47, 79, 79, 1)',
            borderWidth: 1
        },
        {
            label: '2018年分布',
            data: douyinData.distribution2018,
            backgroundColor: 'rgba(255, 0, 0, 0.7)',
            borderColor: 'rgba(255, 0, 0, 1)',
            borderWidth: 1
        }
    ];
    charts.douyin.update();
}

// 气候图表交互函数
function showClimateData(type) {
    // 更新按钮状态
    document.querySelectorAll('.chart-container:nth-child(4) .btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    if (type === 'all') {
        charts.climate.data.datasets.forEach(dataset => {
            dataset.hidden = false;
        });
    } else if (type === 'temperature') {
        charts.climate.data.datasets.forEach((dataset, index) => {
            dataset.hidden = index !== 2; // 只显示气温
        });
    } else if (type === 'water') {
        charts.climate.data.datasets.forEach((dataset, index) => {
            dataset.hidden = index === 2; // 隐藏气温
        });
    }
    charts.climate.update();
}

function highlightSummer() {
    const backgroundColors = climateData.months.map((month, index) => {
        if (index >= 5 && index <= 7) { // 6月、7月、8月
            return 'rgba(255, 0, 0, 0.7)';
        }
        return 'rgba(0, 128, 0, 0.5)';
    });
    
    charts.climate.data.datasets[0].backgroundColor = backgroundColors;
    charts.climate.update();
}

// 汽车图表交互函数
function showCarData(type) {
    // 更新按钮状态
    document.querySelectorAll('.chart-container:nth-child(5) .btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    if (type === 'monthly') {
        charts.car.config.type = 'bar';
        charts.car.data.labels = carSalesData.months;
        charts.car.data.datasets[0] = {
            label: '销售额(亿元)',
            data: carSalesData.monthlySales,
            backgroundColor: 'rgba(50, 153, 204, 0.7)',
            borderColor: 'rgba(50, 153, 204, 1)',
            borderWidth: 1
        };
        charts.car.options.scales.y.title.text = '销售额(亿元)';
    } else if (type === 'regional') {
        charts.car.config.type = 'line';
        charts.car.data.labels = carSalesData.regions;
        charts.car.data.datasets[0] = {
            label: '地区销量(辆)',
            data: carSalesData.regionalSales,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.1)',
            tension: 0.3,
            pointRadius: 4,
            pointHoverRadius: 6,
            borderWidth: 3
        };
        charts.car.options.scales.y.title.text = '销量(辆)';
    } else if (type === 'stacked') {
        charts.car.config.type = 'line';
        charts.car.data.labels = carSalesData.regions;
        charts.car.data.datasets[0] = {
            label: '地区销量(辆)',
            data: carSalesData.regionalSales,
            backgroundColor: 'rgba(153, 153, 255, 0.7)',
            borderColor: 'rgba(153, 153, 255, 1)',
            borderWidth: 2,
            fill: true,
            tension: 0.3
        };
        charts.car.options.scales.y.title.text = '销量(辆)';
    }
    charts.car.update();
}

function animateCarChart() {
    const originalData = [...charts.car.data.datasets[0].data];
    charts.car.data.datasets[0].data = charts.car.data.datasets[0].data.map(() => 0);
    charts.car.update();
    
    setTimeout(() => {
        charts.car.data.datasets[0].data = originalData;
        charts.car.update();
    }, 300);
}

// 页面加载时的动画效果
function animateChartsOnLoad() {
    // 产品图表动画
    if (charts.product) {
        animateProductChartOnLoad();
    }
    
    // 宠物图表动画
    if (charts.pets) {
        animateBarChartOnLoad(charts.pets);
    }
    
    // 抖音图表动画
    if (charts.douyin) {
        animateBarChartOnLoad(charts.douyin);
    }
    
    // 气候图表动画
    if (charts.climate) {
        animateClimateChartOnLoad();
    }
    
    // 汽车图表动画
    if (charts.car) {
        animateBarChartOnLoad(charts.car);
    }
}

function animateProductChartOnLoad() {
    const originalDataA = [...charts.product.data.datasets[0].data];
    const originalDataB = [...charts.product.data.datasets[1].data];
    
    charts.product.data.datasets[0].data = originalDataA.map(() => 0);
    charts.product.data.datasets[1].data = originalDataB.map(() => 0);
    charts.product.update('none');
    
    setTimeout(() => {
        charts.product.data.datasets[0].data = originalDataA;
        charts.product.update({
            duration: 1500,
            easing: 'easeInOutQuart'
        });
    }, 200);
    
    setTimeout(() => {
        charts.product.data.datasets[1].data = originalDataB;
        charts.product.update({
            duration: 1500,
            easing: 'easeInOutQuart'
        });
    }, 500);
}

function animatePieChartOnLoad(chart) {
    const originalData = [...chart.data.datasets[0].data];
    chart.data.datasets[0].data = originalData.map(() => 0);
    chart.update('none');
    
    setTimeout(() => {
        chart.data.datasets[0].data = originalData;
        chart.update({
            duration: 2000,
            easing: 'easeInOutBack'
        });
    }, 300);
}

function animateBarChartOnLoad(chart) {
    const originalData = [...chart.data.datasets[0].data];
    chart.data.datasets[0].data = originalData.map(() => 0);
    chart.update('none');
    
    setTimeout(() => {
        chart.data.datasets[0].data = originalData;
        chart.update({
            duration: 1800,
            easing: 'easeInOutQuart'
        });
    }, 400);
}

function animateLineChartOnLoad(chart) {
    const originalData = [...chart.data.datasets[0].data];
    chart.data.datasets[0].data = originalData.map(() => 0);
    chart.update('none');
    
    setTimeout(() => {
        chart.data.datasets[0].data = originalData;
        chart.update({
            duration: 2000,
            easing: 'easeInOutCubic'
        });
    }, 500);
}

function animateClimateChartOnLoad() {
    const originalPrecipitation = [...charts.climate.data.datasets[0].data];
    const originalEvaporation = [...charts.climate.data.datasets[1].data];
    const originalTemperature = [...charts.climate.data.datasets[2].data];
    
    charts.climate.data.datasets[0].data = originalPrecipitation.map(() => 0);
    charts.climate.data.datasets[1].data = originalEvaporation.map(() => 0);
    charts.climate.data.datasets[2].data = originalTemperature.map(() => 0);
    charts.climate.update('none');
    
    setTimeout(() => {
        charts.climate.data.datasets[0].data = originalPrecipitation;
        charts.climate.data.datasets[1].data = originalEvaporation;
        charts.climate.update({
            duration: 1500,
            easing: 'easeInOutQuart'
        });
    }, 200);
    
    setTimeout(() => {
        charts.climate.data.datasets[2].data = originalTemperature;
        charts.climate.update({
            duration: 2000,
            easing: 'easeInOutCubic'
        });
    }, 600);
}



// 添加一些额外的交互功能
document.addEventListener('DOMContentLoaded', function() {
    // 添加键盘快捷键
    document.addEventListener('keydown', function(e) {
        if (e.key === 'r' || e.key === 'R') {
            // R键重新播放所有动画
            animateChartsOnLoad();
        }
    });
    
    // 添加容器加载动画效果
    const containers = document.querySelectorAll('.chart-container');
    containers.forEach((container, index) => {
        container.style.opacity = '0';
        container.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            container.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            container.style.opacity = '1';
            container.style.transform = 'translateY(0)';
        }, index * 150);
    });
});