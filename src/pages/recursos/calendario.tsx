import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { useCallback, useEffect, useState } from 'react'
import { Hours, Event } from '../../components/types/resourcesTypes'

interface CalendarioProps {

}

const Calendario = (props: CalendarioProps) => {


    const [eventos, setEventos] = useState<Event[]>([])

    const fetchHours = () => {
        fetch('https://modulo-recursos-psa.herokuapp.com/hours')
        .then(res => res.json())
        .then(res => {

            let horas_por_empleado = res.filter((item:Hours) => item.hourAssignee == 2 )
            let eventos2:Event[] = []

            horas_por_empleado.forEach((item:Hours) => {
                let evento:Event = {
                    title: item.task.name,
                    date: item.startingDate.toString()
                }
                eventos2.push(evento)
            })

            setEventos(eventos2)

        })
        .catch(err => {
            console.log(JSON.stringify(err))
        })
    }

    useEffect(() => {
        fetchHours()
    }, []);


    return (
        <>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={eventos}
            />
        </>
    )
}

export default Calendario
