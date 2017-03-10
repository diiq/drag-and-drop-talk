class ActionsController < ApplicationController
  def create
    pars = params.permit(:actual_time, :task_id)
    Action.create(pars)
  end

  def index
    Action.where(params[:task_id])
  end
end
