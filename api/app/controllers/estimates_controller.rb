class EstimatesController < ApplicationController
  respond_to :json

  def create
    pars = params.permit(:mode, :extreme, :rationale, :task_id)
    respond_with Estimate.create(pars)
  end

  def update
    pars = params.permit(:mode, :extreme, :rationale)
    respond_with Estimate.find(params[:id]).update(pars)
  end

  def index
    respond_with Estimate.where(task_id: params[:task_id])
  end
end
