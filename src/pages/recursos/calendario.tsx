import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { useCallback, useEffect, useState } from 'react'
import { Hours, Event, License } from '../../components/types/resourcesTypes'
import { isTypeNode } from 'typescript'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'


interface CalendarioProps {

}

const Calendario = (props: CalendarioProps) => {


    const [eventos, setEventos] = useState<Event[]>([])

    const fetchProjects = () => {
        fetch('https://modulo-recursos-psa.herokuapp.com/hours')
        .then(res => res.json())
        .then(res => {

            let horas_por_empleado = res.filter((item:Hours) => item.hourAssignee === 3 )
            let eventos2:Event[] = []

            horas_por_empleado.forEach((item:Hours) => {
                let evento:Event = {
                    title: item.task.name + " (" + item.duration + "hs)",
                    start: Date.parse(item.startingDate) + 60*60*24*1000,
                    timeZone: 'local',
                    end: Date.parse(item.startingDate), //+ 60 * 60 * 1000 * item.duration,
                    color: "blue",
                    allDay: false
                }
                eventos2.push(evento)
            })

            fetch('https://modulo-recursos-psa.herokuapp.com/licenses')
            .then(res => res.json())
            .then(res => {

                let licencias_por_empleado = res.filter((item:License) => item.licensedPersonCode === 3 )

                licencias_por_empleado.forEach((item:License) => {
                    let evento:Event = {
                        title: item.licenseType,
                        start: Date.parse(item.startingDate),
                        timeZone: 'local',
                        end: Date.parse(item.startingDate) + 60 * 60 * 24 * 1000 * item.durationDays,
                        color: "red",
                        allDay: true
                    }
                    eventos2.push(evento)
                })

                console.log(eventos2)
                setEventos(eventos2)

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
        fetchProjects()
    }, []);

    return (
        <>
         <div className="flex flex-row" >
            <Link to={'/recursos/'} >
                <Button>Volver atras</Button>
            </Link>
        </div>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                displayEventTime={false}
                events={eventos}
            />
        </>
    )
}

export default Calendario
