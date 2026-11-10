package ar.com.vitalink360

import android.app.Activity
import android.app.AlertDialog
import android.graphics.Color
import android.os.Bundle
import android.view.Gravity
import android.view.ViewGroup
import android.widget.Button
import android.widget.LinearLayout
import android.widget.ScrollView
import android.widget.TextView

class MainActivity : Activity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val layout = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setPadding(24, 36, 24, 36)
            setBackgroundColor(Color.rgb(248, 250, 252))
        }
        fun label(textValue: String, fontSize: Float): TextView =
            TextView(this).apply {
                text = textValue
                textSize = fontSize
                gravity = Gravity.CENTER
                setTextColor(Color.rgb(25, 45, 63))
                setPadding(8, 12, 8, 12)
            }
        fun action(title: String, background: Int, message: String) {
            val button = Button(this).apply {
                text = title
                textSize = 21f
                isAllCaps = false
                setTextColor(Color.WHITE)
                setBackgroundColor(background)
                minHeight = 110
                contentDescription = title
                setOnClickListener {
                    AlertDialog.Builder(this@MainActivity)
                        .setTitle(title)
                        .setMessage(message)
                        .setPositiveButton("Entendido", null)
                        .show()
                }
            }
            layout.addView(button, LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT, 120
            ).apply { topMargin = 18 })
        }
        layout.addView(label("VITALINK 360", 32f))
        layout.addView(label("Tu asistencia, más cerca", 21f))
        action("SOS · NECESITO AYUDA", Color.rgb(188, 37, 50),
            "MODO DEMOSTRACIÓN: todavía no se envían alertas a una central. Ante una emergencia real, llamá al número habitual de tu servicio.")
        action("LLAMAR A MI CENTRAL", Color.rgb(29, 84, 144),
            "El teléfono de la central todavía no está configurado. Usá tu número habitual.")
        action("MÉDICO A DOMICILIO", Color.rgb(22, 109, 97),
            "Próximamente: solicitud de atención domiciliaria.")
        action("MIS SERVICIOS", Color.rgb(66, 80, 105),
            "Urgencias y emergencias · Atención domiciliaria · Áreas protegidas · Eventos · Capacitaciones · Ambulancias 24/7.")
        layout.addView(label("Versión 0.1 · Demostración sin despacho activo", 15f))
        val scroll = ScrollView(this)
        scroll.addView(layout)
        setContentView(scroll)
    }
}
