import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal, TextInput, Button } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";


// import DateTimePicker from 'react-native-ui-datepicker';
// import dayjs from 'dayjs';

const EmployeeTaskHome = () => {

    const [taskList, setTaskList] = useState(null)

    const [modalVisible, setModalVisible] = useState(false);

    const [taskname, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');

    const [taskComesUnder, setTaskComesUnder] = useState(null)

    const handleTaskComeUnder = (option) => {
        setTaskComesUnder(option)
    }

    const [taskType, setTaskType] = useState(null)

    const handleTaskType = (option) => {
        setTaskType(option)
    }

    const [includeTravel, setIncludeTravel] = useState(null)

    const handleIncludeTravel = (option) => {
        setIncludeTravel(option)
    }

    const [priorityLevel, setPriorityLevel] = useState(null)

    const handlePriorityLevel = (option) => {
        setPriorityLevel(option)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://cubixweberp.com:156/api/CRMTaskMainList/CPAYS/all/-/-/-/-/-/2024-01-10/2024-03-28/-');
                setTaskList(response.data);
            } catch (error) {
                console.log(error, 'getTaskListError')
            }
        };

        fetchData();
    }, [])


    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const [date, setDate] = useState('')
    const [time, setTime] = useState('')

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleDateConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        const dt = new Date(date)
        const x = dt.toISOString().split('T')
        const x1 = x[0].split('-')
        console.log(x1[2] + '/' + x1[1] + '/' + x1[0])
        setDate(x1[2] + '/' + x1[1] + '/' + x1[0])
        hideDatePicker();
    };

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleTimeConfirm = (time) => {
        console.warn("A time has been picked: ", time);
        const tm = new Date(time)
        const x = tm.toLocaleTimeString()
        console.log(x)
        setTime(x)
        hideTimePicker();
    };

    const getPriorityColor = priority => {
        switch (priority.toLowerCase()) {
            case 'high':
                return '#870404';
            case 'moderate':
                return '#F0D802';
            case 'low':
                return '#36CC36';
            default:
                return '#F3F3F3'; // Default color
        }
    };

    const getTextColor = (priority) => {
        return priority === 'High' || priority === 'Low' ? '#FFFFFF' : '#000000'; // White for High and Low, black for others
    };

    // console.log(taskList)
    console.log(date, 'date')
    console.log(time, 'time')
    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.TaskHomeWrapper}>

                {/* HeaderNav */}
                <View style={styles.THHeaderNav}>
                    <View><Text>EXPERT</Text></View>
                    <View>
                        <Image source={require('../images/ic_hamburger.png')}></Image>
                    </View>
                </View>

                {/* UserBanner */}
                <ImageBackground source={require('../images/header_background.png')} style={{
                    width: "100%",
                    marginTop: 12,
                    // paddingVertical: 24,
                    height: 110,
                    display: "flex",
                    justifyContent: "flex-end"
                    // paddingHorizontal: 0
                }}>
                    <View style={styles.THUserBanner}>
                        <View><Text style={{ fontWeight: "bold", fontSize: 20, color: "black" }}>AJMAL</Text></View>
                        <TouchableOpacity style={styles.button}>
                            <Image source={require('../images/location.png')} style={{
                                width: 16,
                                height: 16,
                            }}></Image>
                            <Text style={styles.buttonText}>CHECKOUT</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>

                {/* AddButtton */}
                <View style={styles.AddButton}>
                    <TouchableOpacity style={styles.buttonAdd} onPress={() => setModalVisible(true)}>
                        <Image source={require('../images/addB.png')} style={{
                            width: 25,
                            height: 20,
                        }}></Image>
                        <Text style={{
                            fontSize: 16,
                            color: "black"
                        }}>Add Task</Text>
                    </TouchableOpacity>
                </View>

                {/* TaskTable */}
                <ScrollView vertical={true} style={{
                    marginTop: 8
                }}>
                    <ScrollView horizontal={true}>
                        <View style={styles.TableContainer}>
                            {/* Table Header */}
                            <View style={styles.tableRow}>
                                <Text style={styles.headerCell}>Name</Text>
                                <Text style={styles.headerCell}>Description</Text>
                                <Text style={styles.headerCell}>Scheduled on</Text>
                                <Text style={styles.headerCell}>Task owner name</Text>
                                <Text style={styles.headerCell}>Priority</Text>
                            </View>

                            {/* Table Data */}
                            {
                                taskList?.map((task, index) => (
                                    <View style={styles.tableRow} key={index}>
                                        <Text style={styles.dataCell}>{task.task_name}</Text>
                                        <Text style={styles.dataCell}>{task.task_description}</Text>
                                        <Text style={styles.dataCell}>{task.task_scheduledon}</Text>
                                        <Text style={styles.dataCell}>{task.task_owner_name}</Text>
                                        <Text style={[styles.dataCell, { backgroundColor: getPriorityColor(task.priority), color: getTextColor(task.priority) }]}>
                                            {task.priority}
                                        </Text>
                                    </View>
                                ))
                            }

                            {/* Add more rows as needed */}
                        </View>
                    </ScrollView>
                </ScrollView>

                {/* AddTaskModal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                textAlign: 'left', width: '100%', color: 'black'
                            }}>New Task</Text>

                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={text => setTaskName(text)}
                                    value={taskname}
                                    placeholder='task name'
                                />
                            </View>

                            <View style={[styles.inputContainer, { marginBottom: 8 }]}>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={text => setTaskDescription(text)}
                                    value={taskDescription}
                                    placeholder='task description'
                                />
                            </View>

                            <View style={styles.taskComesUnderCont}>
                                <TouchableOpacity style={{
                                    margin: 4,
                                    backgroundColor: 'black',
                                    color: 'white',
                                    paddingVertical: 6,
                                    paddingHorizontal: 12,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    borderRadius: 4
                                }}
                                    onPress={() => handleTaskComeUnder('Common Job')}
                                >
                                    <Text style={[styles.defaultOption, taskComesUnder === 'Common Job' && styles.selectedOption]}></Text>
                                    <Text style={{ color: 'white', marginLeft: 12 }}>Common Job</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{
                                    margin: 4,
                                    backgroundColor: 'black',
                                    color: 'white',
                                    paddingVertical: 6,
                                    paddingHorizontal: 12,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    borderRadius: 4
                                }}
                                    onPress={() => handleTaskComeUnder('Project')}
                                >
                                    <Text style={[styles.defaultOption, taskComesUnder === 'Project' && styles.selectedOption]}></Text>
                                    <Text style={{ color: 'white', marginLeft: 12 }}>Project</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{
                                textAlign: 'left',
                                width: '100%'
                            }}><Text>Task Type</Text></View>

                            <View style={styles.taskComesUnderCont}>
                                <TouchableOpacity style={{
                                    margin: 4,
                                    backgroundColor: 'black',
                                    color: 'white',
                                    paddingVertical: 6,
                                    paddingHorizontal: 12,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    borderRadius: 4
                                }}
                                    onPress={() => handleTaskType('Inhouse')}
                                >
                                    <Text style={[styles.defaultOption, taskType === 'Inhouse' && styles.selectedOption]}></Text>
                                    <Text style={{ color: 'white', marginLeft: 12 }}>Inhouse</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{
                                    margin: 4,
                                    backgroundColor: 'black',
                                    color: 'white',
                                    paddingVertical: 6,
                                    paddingHorizontal: 12,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    borderRadius: 4
                                }}
                                    onPress={() => handleTaskType('Outdoor')}
                                >
                                    <Text style={[styles.defaultOption, taskType === 'Outdoor' && styles.selectedOption]}></Text>
                                    <Text style={{ color: 'white', marginLeft: 12 }}>Outdoor</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.dateTimeCont}>

                                <View>
                                    <Text>
                                        Select Task Start Date and Time
                                    </Text>
                                </View>

                                {/* <View style={{ width: '85%' }}>
                                    <Button title="Select Date" onPress={showDatepicker} />
                                    {showDatePicker && (
                                        <DateTimePicker
                                            value={chosenDate}
                                            mode="datetime"
                                            is24Hour={true}
                                            display="default"
                                            onChange={onDateChange}
                                        />
                                    )}
                                </View> */}

                                <View style={{ width: '98%', justifyContent: 'space-between', flexDirection: "row" }}>
                                    <Button title="Date Picker" onPress={showDatePicker} />
                                    <Button title="Time Picker" onPress={showTimePicker} />
                                    <DateTimePickerModal
                                        isVisible={isDatePickerVisible}
                                        mode="date"
                                        onConfirm={handleDateConfirm}
                                        onCancel={hideDatePicker}
                                    />
                                    <DateTimePickerModal
                                        isVisible={isTimePickerVisible}
                                        mode="time"
                                        onConfirm={handleTimeConfirm}
                                        onCancel={hideTimePicker}
                                    />
                                </View>

                            </View>

                            <View style={{
                                textAlign: 'left',
                                width: '100%'
                            }}><Text>Include Travel</Text></View>

                            <View style={styles.taskComesUnderCont}>
                                <TouchableOpacity style={{
                                    margin: 4,
                                    backgroundColor: 'black',
                                    color: 'white',
                                    paddingVertical: 6,
                                    paddingHorizontal: 12,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    borderRadius: 4
                                }}
                                    onPress={() => handleIncludeTravel('Yes')}
                                >
                                    <Text style={[styles.defaultOption, includeTravel === 'Yes' && styles.selectedOption]}></Text>
                                    <Text style={{ color: 'white', marginLeft: 12 }}>Yes</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{
                                    margin: 4,
                                    backgroundColor: 'black',
                                    color: 'white',
                                    paddingVertical: 6,
                                    paddingHorizontal: 12,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    borderRadius: 4
                                }}
                                    onPress={() => handleIncludeTravel('No')}
                                >
                                    <Text style={[styles.defaultOption, includeTravel === 'No' && styles.selectedOption]}></Text>
                                    <Text style={{ color: 'white', marginLeft: 12 }}>No</Text>
                                </TouchableOpacity>
                            </View>


                            <View style={{
                                textAlign: 'left',
                                width: '100%'
                            }}><Text>Priority level</Text></View>

                            <View style={styles.taskComesUnderCont}>
                                <TouchableOpacity style={{
                                    margin: 4,
                                    backgroundColor: 'black',
                                    color: 'white',
                                    paddingVertical: 6,
                                    paddingHorizontal: 12,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    borderRadius: 4
                                }}
                                    onPress={() => handlePriorityLevel('Low')}
                                >
                                    <Text style={[styles.defaultOption, priorityLevel === 'Low' && styles.selectedOption]}></Text>
                                    <Text style={{ color: 'white', marginLeft: 12 }}>Low</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{
                                    margin: 4,
                                    backgroundColor: 'black',
                                    color: 'white',
                                    paddingVertical: 6,
                                    paddingHorizontal: 12,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    borderRadius: 4
                                }}
                                    onPress={() => handlePriorityLevel('Moderate')}
                                >
                                    <Text style={[styles.defaultOption, priorityLevel === 'Moderate' && styles.selectedOption]}></Text>
                                    <Text style={{ color: 'white', marginLeft: 12 }}>Moderate</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{
                                    margin: 4,
                                    backgroundColor: 'black',
                                    color: 'white',
                                    paddingVertical: 6,
                                    paddingHorizontal: 12,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    borderRadius: 4
                                }}
                                    onPress={() => handlePriorityLevel('High')}
                                >
                                    <Text style={[styles.defaultOption, priorityLevel === 'High' && styles.selectedOption]}></Text>
                                    <Text style={{ color: 'white', marginLeft: 12 }}>High</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{
                                justifyContent: 'flex-end',
                                flexDirection: "row",
                                width: '100%',
                                borderTopColor: 'black',
                                borderTopWidth: 1
                                // backgroundColor: 'black'
                            }}>

                                <View style={{
                                    margin: 4,
                                    backgroundColor: 'red',
                                    color: 'white',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 4,
                                    paddingHorizontal: 4
                                }}>
                                    <TouchableOpacity onPress={() => setModalVisible(false)} style={{
                                        margin: 4,
                                        backgroundColor: 'red',
                                        color: 'white'
                                    }}>
                                        <Text style={styles.closeModalButton}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{
                                    margin: 4,
                                    backgroundColor: 'green',
                                    color: 'white',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 4,
                                    paddingHorizontal: 4
                                }}>
                                    <TouchableOpacity onPress={() => setModalVisible(false)} style={{
                                        margin: 4,
                                        color: 'white'
                                    }}>
                                        <Text style={styles.closeModalButton}>Save</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    TaskHomeWrapper: {
        flex: 1,
        alignItems: "center",
    },
    THHeaderNav: {
        width: '100%',
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 12,
        paddingVertical: 14
    },
    THUserBanner: {
        width: '100%',
        paddingHorizontal: 12,
        paddingVertical: 14,
        justifyContent: 'center',
        alignItems: "center",
    },
    button: {
        width: '45%',
        backgroundColor: '#303289',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: "center"
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    AddButton: {
        alignItems: "flex-end",
        width: "100%",
        paddingRight: 14,
        paddingTop: 14,
        color: "black"
    },
    buttonAdd: {
        width: '45%',
        backgroundColor: '#FFC107',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: "center",
        color: 'black'
    },
    TableContainer: {
        width: "100%",
        padding: 10,
        marginTop: 8
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginBottom: 5,
        // paddingVertical: 5,
    },
    headerCell: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        flexWrap: 'nowrap',
        width: 120
    },
    dataCell: {
        flex: 1,
        backgroundColor: '#F3F3F3',
        padding: 10,
        textAlign: 'center',
        width: 120,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderColor: 'white',
        color: "black"
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#F7F7F7',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: '90%'
    },
    closeModalButton: {
        marginTop: 10,
        fontSize: 18,
        color: 'white',
    },
    inputContainer: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        marginTop: 12,
    },
    input: {
        width: '100%',
        height: 40,
        backgroundColor: 'white',
        paddingLeft: 10,
    },
    taskComesUnderCont: {
        width: '100%',
        flexDirection: "row",
        justifyContent: "flex-start",
        marginBottom: 8
    },
    defaultOption: {
        width: 20,
        height: 20,
        backgroundColor: 'white',
        borderRadius: 50
    },
    selectedOption: {
        width: 20,
        height: 20,
        backgroundColor: 'gold',
        borderRadius: 50
    },
    dateTimeCont: {
        justifyContent: "center",
        alignItems: 'flex-start',
        width: '100%',
        marginBottom: 12
    }
})

export default EmployeeTaskHome