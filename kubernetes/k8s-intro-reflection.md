1) Welche Methode hast du zum Aufsetzen deines lokalen Kubernetes Clusters gewählt (Docker Desktop, Minikube, Kind) und warum?
Docker Desktop. Weil ich es sofort ausprobieren wollte. Docker Desktop lief gerade bei mir im Hintergrund. Hatte aber Schwierigkeiten Kubernetes zum Starten zu bringen. Beim Neustart von Docker Desktop hat es dann geklappt.


2) Beschreibe in eigenen Worten, was die Control Plane eines Kubernetes Clusters ist und welche Kernrolle sie hat (ohne spezifische Komponenten wie etcd, Scheduler etc. im Detail zu nennen). 
Es ist das "Gehirn" des Clusters und verwaltet den globalen Zustand. Es ist eine Master Komponente, das bedeutet das Control Plane gibt den "Muskeln" des Clusters die Anweisungen und wie diese auszuführen sind. Zum Beispiel: Container neu starten, löschen, replizieren, etc...    


3) Was ist die Rolle eines Worker Node in einem Kubernetes Cluster?
Wie oben bereits beschrieben sind es die "Muskeln" eines Kubernetes Cluster. Die Worker Nodes werden vom Control Plane aus verwaltet/dirigiert. Innerhalb der jeweiligen Nodes gibt es dann Pods (in denen dann Container sind) und weitere Komponenten die verwaltet werden. Worker Nodes und das Control Plane stehen in ständiger Kommunikation untereinander.


4) Der Befehl kubectl ist das Kommandozeilen-Tool zur Interaktion mit Kubernetes. Mit welchem zentralen Bestandteil der Kubernetes Architektur spricht kubectl direkt, wenn du einen Befehl absetzt?
Läuft auf jedem Worker Node und kommuniziert mit dem Control Plane. kubelet empfängt Anweisungen vom API Server.


5) Wie hast du praktisch überprüft, dass kubectl erfolgreich eine Verbindung zu deinem lokalen Cluster herstellen konnte? Welche Befehle hast du dafür genutzt, und was hast du als erfolgreiche Ausgabe erwartet?
Mit dem Befehl "kubectl config current-context" wurde mir folgendes angezeigt: docker-desktop. Das heißt außer der lokalen docker-desktop Anwendung besteht kein weiterer Kontext. Ein weiterer Kontext könnte ein Deployment, Pods oder ähnliches sein. 
Mit dem Befehl "kubectl get nodes" wurde mir folgendes angezeigt: Der Name der node(s): In diesem Fall docker-desktop. Und die Role. In diesem Fall ist es ein control-plane, da keine worker nodes vorhanden sind.
Mit dem Befehl "kubectl cluster-info" wurde mir folgendes angezeigt: In diesem Fall wird angezeigt, daß das control-plane, der docker-desktop also über einen kubernetes docker server läuft.


6) Basierend auf dem Theorieteil: Erkläre kurz die Kernidee der deklarativen Philosophie von Kubernetes.
Deklarativ VS Imperativ. 
Beim imperativen Verfahren gebe ich als Benutzer dem System Anweisungen was es tun soll. Also wie(und wann) man etwas durchführt.
Beim Deklarativen Verfahren geht es darum, daß etwas -also z.B. ein Zustand- erreicht werden soll. -> Desired State. Also der Fokus liegt darauf, daß ein bestimmtes Ziel erreicht werden soll, unabhängig davon wie dies geschehen soll.
Also Kubernetes kann mit Hilfe der Orchestrierungs Tools den Desired State erreichen. Das auf verschiedene Art und Weise. Z.B. Skalierung, yaml files, etc...