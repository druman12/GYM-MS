# Build React and Serve with Django
web: cd GMS_FRONTEND && npm install && npm run build && cd .. && python NewFitnessPoint/manage.py migrate && python NewFitnessPoint/manage.py collectstatic --noinput && gunicorn NewFitnessPoint.NewFitnessPoint.wsgi:application
