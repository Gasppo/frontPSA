import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { useCallback, useEffect, useState } from 'react'
import { Hours, Event, License, SelectResource } from '../../components/types/resourcesTypes'
import LoadingIndicator from '../../components/Loading/LoadingIndicator';
import { isTypeNode } from 'typescript'
import Select from 'react-select';
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import PageTitle from '../../components/UI/Dashboard/PageTitle';


interface CalendarioProps {

}

const Calendario = (props: CalendarioProps) => {

    const [selected, setSelected] = useState<any>(0);
    const [eventos, setEventos] = useState<Event[]>([]);
    const [recursos, setRecursos] = useState<SelectResource[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchEmployees = () => {
        fetch('https://modulo-recursos-psa.herokuapp.com/employees')
            .then(res => res.json())
            .then(res => {
                console.log(res)
                let resources: SelectResource[] = [];
                res.forEach((item: any) => {
                    let proj = {
                        label: item.Apellido + "," + item.Nombre,
                        value: item.legajo
                    }
                    if (true)
                        resources.push(proj)
                })
                setRecursos(resources);
                setLoading(false);
            })
            .catch(err => {
                console.log(JSON.stringify(err))
            })


    }

    const fetchProjects = () => {
        fetch('https://modulo-recursos-psa.herokuapp.com/hours')
            .then(res => res.json())
            .then(res => {
                let horas_por_empleado = res.filter((item: Hours) => item.hourAssignee === selected.value)
                let eventos2: Event[] = []

                horas_por_empleado.forEach((item: Hours) => {
                    let evento: Event = {
                        title: item.task.name + " (" + item.duration + "hs)",
                        start: Date.parse(item.startingDate) + 60 * 60 * 24 * 1000,
                        timeZone: 'local',
                        end: Date.parse(item.startingDate),
                        color: "blue",
                        allDay: false
                    }
                    eventos2.push(evento)
                })

                fetch('https://modulo-recursos-psa.herokuapp.com/licenses')
                    .then(res => res.json())
                    .then(res => {

                        let licencias_por_empleado = res.filter((item: License) => item.licensedPersonCode === selected.value)

                        licencias_por_empleado.forEach((item: License) => {
                            let evento: Event = {
                                title: item.licenseType,
                                start: Date.parse(item.startingDate),
                                timeZone: 'local',
                                end: Date.parse(item.startingDate) + 60 * 60 * 24 * 1000 * item.durationDays,
                                color: "red",
                                allDay: true
                            }
                            eventos2.push(evento)
                        })

                        console.log(eventos2);
                        setEventos(eventos2);
                        setLoading(false);
                    })
                    .catch(err => {
                        console.log(JSON.stringify(err))
                    })

            })
            .catch(err => {
                console.log(JSON.stringify(err))
            })

    }

    useEffect(() => {
        setLoading(true);
        if (selected != 0) {
            fetchProjects();
        }
        else {
            fetchEmployees();
        }
    }, [selected]);

    return (
        <>
            <LoadingIndicator show={loading} className="w-[95%] mb-10">
                <PageTitle label='Calendario'>
                    <div className="flex flex-row" >
                        <Link to={'/recursos/'} >
                            <Button>Volver al inicio</Button>
                        </Link>
                    </div>
                </PageTitle>

                <Select options={recursos} onChange={(value) => setSelected(value)} className={`z-20`} />
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    displayEventTime={false}
                    events={eventos}
                />
            </LoadingIndicator>
        </>
    )
}

export default Calendario
