class ActionsController < ApplicationController
  respond_to :json

  def show
    respond_with Action.find(params[:id])
  end

  def create
    pars = params.permit(:actual_time, :task_id)
    print session, "freddy"
    if !session[:verification]
      session[:verification] = Emoji.all.sample.image_filename
    end
    pars[:verification] = session[:verification]
    print session, "freddyfreddy"
    respond_with Action.create(pars)
  end

  def index
    respond_with Action.where(task_id: params[:task_id])
  end
end
